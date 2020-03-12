pragma solidity 0.5.8;


interface UniswapExchangeInterface {
    // Address of ERC20 token sold on this exchange
    function tokenAddress() external view returns (address token);
    // Address of Uniswap Factory
    function factoryAddress() external view returns (address factory);
    // Provide Liquidity
    function addLiquidity(uint256 min_liquidity, uint256 max_tokens, uint256 deadline) external payable returns (uint256);
    function removeLiquidity(uint256 amount, uint256 min_eth, uint256 min_tokens, uint256 deadline) external returns (uint256, uint256);
    // Get Prices
    function getEthToTokenInputPrice(uint256 eth_sold) external view returns (uint256 tokens_bought);
    function getEthToTokenOutputPrice(uint256 tokens_bought) external view returns (uint256 eth_sold);
    function getTokenToEthInputPrice(uint256 tokens_sold) external view returns (uint256 eth_bought);
    function getTokenToEthOutputPrice(uint256 eth_bought) external view returns (uint256 tokens_sold);
    // Trade ETH to ERC20
    function ethToTokenSwapInput(uint256 min_tokens, uint256 deadline) external payable returns (uint256  tokens_bought);
    function ethToTokenTransferInput(uint256 min_tokens, uint256 deadline, address recipient) external payable returns (uint256  tokens_bought);
    function ethToTokenSwapOutput(uint256 tokens_bought, uint256 deadline) external payable returns (uint256  eth_sold);
    function ethToTokenTransferOutput(uint256 tokens_bought, uint256 deadline, address recipient) external payable returns (uint256  eth_sold);
    // Trade ERC20 to ETH
    function tokenToEthSwapInput(uint256 tokens_sold, uint256 min_eth, uint256 deadline) external returns (uint256  eth_bought);
    function tokenToEthTransferInput(uint256 tokens_sold, uint256 min_eth, uint256 deadline, address recipient) external returns (uint256  eth_bought);
    function tokenToEthSwapOutput(uint256 eth_bought, uint256 max_tokens, uint256 deadline) external returns (uint256  tokens_sold);
    function tokenToEthTransferOutput(uint256 eth_bought, uint256 max_tokens, uint256 deadline, address recipient) external returns (uint256  tokens_sold);
    // Trade ERC20 to ERC20
    function tokenToTokenSwapInput(uint256 tokens_sold, uint256 min_tokens_bought, uint256 min_eth_bought, uint256 deadline, address token_addr) external returns (uint256  tokens_bought);
    function tokenToTokenTransferInput(uint256 tokens_sold, uint256 min_tokens_bought, uint256 min_eth_bought, uint256 deadline, address recipient, address token_addr) external returns (uint256  tokens_bought);
    function tokenToTokenSwapOutput(uint256 tokens_bought, uint256 max_tokens_sold, uint256 max_eth_sold, uint256 deadline, address token_addr) external returns (uint256  tokens_sold);
    function tokenToTokenTransferOutput(uint256 tokens_bought, uint256 max_tokens_sold, uint256 max_eth_sold, uint256 deadline, address recipient, address token_addr) external returns (uint256  tokens_sold);
    // Trade ERC20 to Custom Pool
    function tokenToExchangeSwapInput(uint256 tokens_sold, uint256 min_tokens_bought, uint256 min_eth_bought, uint256 deadline, address exchange_addr) external returns (uint256  tokens_bought);
    function tokenToExchangeTransferInput(uint256 tokens_sold, uint256 min_tokens_bought, uint256 min_eth_bought, uint256 deadline, address recipient, address exchange_addr) external returns (uint256  tokens_bought);
    function tokenToExchangeSwapOutput(uint256 tokens_bought, uint256 max_tokens_sold, uint256 max_eth_sold, uint256 deadline, address exchange_addr) external returns (uint256  tokens_sold);
    function tokenToExchangeTransferOutput(uint256 tokens_bought, uint256 max_tokens_sold, uint256 max_eth_sold, uint256 deadline, address recipient, address exchange_addr) external returns (uint256  tokens_sold);
    // ERC20 comaptibility for liquidity tokens
  
    function transfer(address _to, uint256 _value) external returns (bool);
    function transferFrom(address _from, address _to, uint256 value) external returns (bool);
    function approve(address _spender, uint256 _value) external returns (bool);
    function allowance(address _owner, address _spender) external view returns (uint256);
    function balanceOf(address _owner) external view returns (uint256);
    function totalSupply() external view returns (uint256);
    // Never use
    function setup(address token_addr) external;
}

interface Token {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract Portal{
    uint256 public totalXio;
    uint256 interestRate = 684931506849315;
    address owner;
    uint constant MAX_UINT = 2**256 - 1; 
    uint constant ONE_DAY = 24*60*60;
    address xioExchangeAddress = 0xf9f62d768DaD7ccc2E60a115FFDAC88b9B8c70cc;
    address xioContractAddress = 0x5d3069CBb2BFb7ebB9566728E44EaFDaC3E52708;
    uint256 portalId = 0;
    bool paused = false;
    
    //for testing
    uint constant ONE_MINUTE = 60;


    mapping (address=>StakerData[]) public stakerData;
    mapping (uint256=>PortalData) public portalData;
    mapping (address=>bool) internal whiteListed;

    struct StakerData{
        uint256 portalId;
        address publicKey;
        uint256 stakeQuantity;
        uint256 stakeDurationTimestamp;
        uint256 stakeInitiationTimestamp;
        string outputTokenSymbol;
    }


    struct PortalData{
        uint256 portalId;
        address tokenAddress;
        address tokenExchangeAddress;
        string outputTokenSymbol;
        uint256 xioStaked;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    modifier isNotPaused(){
        require(paused == false);
        _;
    }
    
    event DataEntered(address staker, uint256  portalId, uint256 quanitity); // When data is entered into the mapping
    event Tranferred(address staker, uint256  portalId, uint256 quanitity, string symbol); // When bought tokens are transferred to staker
    event Bought(address staker, uint256  portalId, uint256 _tokensBought, string symbol); // When tokens are bought
    event Transfer(address to, uint256 value); // When tokens are withdrawn
    event NotTransfer(address to, uint256 value); // When tokens are not withdrawn
    
    /* @dev to initialize xio token and exchange address
    *  @param _xioToken , xio token address
    *  @param _xioExchange, xio exchange address on Uniswap
    */
    
    constructor() public {
        owner = msg.sender;
    }
    
    /* @dev stake function which calls uniswaps exchange to buy output tokens and send them to the user.
    *  @param _quantity , xio token quanity user has staked (in wei)
    *  @param _xioQuantity, xio interest generated upon the days (in wei)
    *  @param _tokensBought, how much tokens are bought from the uniswaps exchange (in wei)
    *  @param _portalId, portal id of the exchange.
    *  @param _symbol, bought token symbol
    *  @param _outputTokenAddress, bought token ERC20 address
    *  @param _days, how much days he has staked (in days)
    */
    
    function stakeXIO( address _outputTokenAddress, uint256 _days, uint256 _xioQuantity, uint256 _tokensBought, uint256 _portalId, string memory _symbol) public isNotPaused returns (bool){
        
        require(_days>0, "Invalid Days");  // To check days
        require(_xioQuantity >0 , "Invalid XIO quanity"); // To verify XIO quantity
        require(_outputTokenAddress != address(0),"0 address not allowed"); // To verify output token address
        require(isContract(_outputTokenAddress) != false, "not a contract address"); // To verify address is contract or not
        require(portalData[_portalId].tokenAddress != address(0), "Portal does not exists"); // To verify portal info
        require(whiteListed[msg.sender] == true, "Not whitelist address");
        
        // stakerData[msg.sender].push(StakerData(_portalId, msg.sender, _xioQuantity, _days*ONE_DAY, block.timestamp, _symbol));
        
        stakerData[msg.sender].push(StakerData(_portalId, msg.sender, _xioQuantity, _days*ONE_MINUTE, block.timestamp, _symbol));
        
        emit DataEntered(msg.sender,_portalId,_xioQuantity);
        
        portalData[_portalId].xioStaked = portalData[_portalId].xioStaked + _xioQuantity ;
        
        totalXio = totalXio + _xioQuantity;
        
        Token(xioContractAddress).transferFrom(msg.sender, address(this),_xioQuantity);
        
        uint256 soldXIO = (_xioQuantity * interestRate * _days)/1000000000000000000;
        
        uint256 bought = UniswapExchangeInterface(xioExchangeAddress).tokenToTokenSwapInput(soldXIO,_tokensBought,1,1839591241,_outputTokenAddress);
        
        if(bought>0){
            emit Bought(msg.sender,_portalId,_tokensBought,_symbol);
            Token(_outputTokenAddress).transfer(msg.sender,_tokensBought);
            emit Tranferred(msg.sender,_portalId,_tokensBought,_symbol);
            return true;
        }
        return false;
    }
    
    /* @dev withdrwal function by which user can withdraw their staked xio
    *  @param _amount , xio token quanity user has staked (in wei)
    */
    
    
    
    function withdrawXIO(uint256 _amount) public isNotPaused {
        require(_amount>0, "AMOUNT SHOULD BE GREATER THAN 0");
        bool done = false;
        StakerData[] storage stakerArray= stakerData[msg.sender];
        for(uint256 i=0; i<stakerArray.length;i++){
            if((stakerArray[i].stakeInitiationTimestamp + stakerArray[i].stakeDurationTimestamp <= block.timestamp) && (stakerArray[i].stakeQuantity - _amount  >= 0) && (stakerArray[i].publicKey != address(0))){
                Token(xioContractAddress).transfer(msg.sender,_amount);
                emit Transfer(msg.sender,_amount);
                stakerArray[i].stakeQuantity = stakerArray[i].stakeQuantity -  _amount;
                portalData[stakerArray[i].portalId].xioStaked = portalData[stakerArray[i].portalId].xioStaked - _amount;
                totalXio = totalXio - _amount;
                if(stakerArray[i].stakeQuantity==0){
                    stakerArray[i].publicKey = 0x0000000000000000000000000000000000000000;
                }
                done=true;
                break;
            }
        }
        if(!done){
            emit NotTransfer(msg.sender,_amount);
        }
        
    }
    
    
    /* @dev to add portal into the contract
    *  @param _tokenAddress, address of output token
    *  @param _tokenExchangeAddress, exhange address of token on uniswap
    *  @param _outputTokenSymbol, symbol of ouput token
    */
    
    function addPortal(
        address _tokenAddress,
        address _tokenExchangeAddress,
        string memory _outputTokenSymbol) public onlyOwner isNotPaused returns(bool){
            require(_tokenAddress != address(0), "Zero address not allowed");
            require(_tokenExchangeAddress != address(0), "Zero address not allowed");
            require(checkPortalExist(_tokenAddress) == false , "Portal already exists");
            portalData[portalId] = PortalData(portalId, _tokenAddress, _tokenExchangeAddress, _outputTokenSymbol, 0);
            portalId++;
            return true;
    }
    
    
    /* @dev to check portal if it already exists or not
    *  @param _tokenAddress, address of output token
    */
    
    function checkPortalExist(address _tokenAddress) internal view returns (bool){
        bool exists;
        for(uint128 i=0; ;i++){
            if(portalData[i].tokenAddress == address(0)){
                exists = false;
                break;
            }else if(portalData[i].tokenAddress == _tokenAddress){
                exists = true;
                break;
            }
        }
        return exists;
    }
    
    /* @dev to delete portal into the contract
    *  @param _portalId, portal Id of portal
    */
    
    function removePortal(uint256 _portalId) public onlyOwner isNotPaused returns(bool){
            require(_portalId >0 , "Invalid Portal id");
            require(portalData[_portalId].tokenAddress != address(0),"Portal does not exist");
            portalData[_portalId] = PortalData(_portalId, 0x0000000000000000000000000000000000000000, 0x0000000000000000000000000000000000000000, "NONE", 0);
            return true;
    }
    
    
    /* @dev to check if user can wtihdraw their staked xio or not
    *  @param _amount , xio token quanity user has staked (in wei)
    *  @param _staker , public address of staker
    */
    
    
    function canWithdrawXIO(uint256 _amount, address _staker) public view returns (bool) {
        bool done = false;
        StakerData[] storage stakerArray= stakerData[_staker];
      
        for(uint256 i=0; i<stakerArray.length;i++){
            if((stakerArray[i].stakeInitiationTimestamp + stakerArray[i].stakeDurationTimestamp <= block.timestamp) && (stakerArray[i].stakeQuantity -  _amount >= 0) && (stakerArray[i].publicKey != address(0))){
                done=true;
                break;
            }
        }
        if(!done){
            return false;
        }
        return true;
        
    }
   
    /* @dev to check if given address is contract's or not
    *  @param _addr, public address
    */
    
    function isContract(address _addr) internal view returns (bool){
        uint32 size;
        assembly {
            size := extcodesize(_addr)
        }
        return (size > 0);
    }
    
    /* @dev to get total xio staked into the portal */
    
    function getTotalXIOStaked() public view returns (uint256){
        return totalXio;
    }
    
    /* @dev to set interest rate. Can only be called by owner 
    *  @param _rate, interest rate (in wei)
    */
    
    function setInterestRate(uint256 _rate) public onlyOwner isNotPaused returns(bool){
        require(_rate!=0,"RATE CAN'T BE ZERO");
        interestRate = _rate;
    }
    
    /* @dev to pause contract */
    
    function pauseContract() public onlyOwner {
        paused = true;
    }
    
    /* @dev to pause contract */
    
    function unPauseContract() public onlyOwner {
        paused = false;
    }
    
    /* @dev to get interest rate of the portal */

    function getInterestRate() public view returns(uint256){
        return interestRate;
    }
    
    /* @dev to allow XIO exchange max XIO tokens from the portal, can only be called by owner */

    function allowXIO() public onlyOwner returns(bool){
        return Token(xioContractAddress).approve(xioExchangeAddress, MAX_UINT);
    }
    
    /* @dev to get exchange rate of XIO to ETH
    *  @param _amount, xio amount
    */

    function getXIOtoETH(uint256 _amount) public view returns (uint256){
        return UniswapExchangeInterface(xioExchangeAddress).getTokenToEthInputPrice(_amount);
    }
    
    /* @dev to get exchange rate of ETH to ALT
    *  @param _amount, xio amount
    *  @param _outputTokenAddressExchange, exchange address of output token on uniswap
    */

    function getETHtoALT(uint256 _amount, address _outputTokenAddressExchange) public view returns (uint256){
        return UniswapExchangeInterface(_outputTokenAddressExchange).getEthToTokenInputPrice(_amount);
    }
    
    
    /* @dev to get array's lenght of staker data // for front end feasiblity
    *  @param _address, address of staker
    */
    
    function getArrayLengthOfStakerData(address _address) public view returns(uint256){
        return stakerData[_address].length;
    }
    
    
    /* @dev to add whitelist addresses // for front end feasiblity
    *  @param __staker, array of staker address
    */
    
    function addWhiteListAccount(address[] memory _staker) public onlyOwner isNotPaused {
        for(uint8 i=0; i<_staker.length;i++){
            whiteListed[_staker[i]]=true;
        }
    }

}
