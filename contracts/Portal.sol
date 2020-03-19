pragma solidity 0.5.8;

library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}

interface UniswapFactoryInterface {
    // Create Exchange
    function createExchange(address token) external returns (address exchange);
    // Get Exchange and Token Info
    function getExchange(address token) external view returns (address exchange);
    function getToken(address exchange) external view returns (address token);
    function getTokenWithId(uint256 tokenId) external view returns (address token);
    // Never use
    function initializeFactory(address template) external;
}


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
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (string memory);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract Ownable {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () internal {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), _owner);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(isOwner(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Returns true if the caller is the current owner.
     */
    function isOwner() public view returns (bool) {
        return msg.sender == _owner;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     */
    function _transferOwnership(address newOwner) internal  {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

contract Pausable is Ownable {
    /**
     * @dev Emitted when the pause is triggered by a pauser (`account`).
     */
    event Paused(address account);

    /**
     * @dev Emitted when the pause is lifted by a pauser (`account`).
     */
    event Unpaused(address account);

    bool private _paused;

    /**
     * @dev Initializes the contract in unpaused state. Assigns the Pauser role
     * to the deployer.
     */
    constructor () internal {
        _paused = false;
    }

    /**
     * @dev Returns true if the contract is paused, and false otherwise.
     */
    function paused() public view returns (bool) {
        return _paused;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     */
    modifier whenNotPaused() {
        require(!_paused, "Pausable: paused");
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     */
    modifier whenPaused() {
        require(_paused, "Pausable: not paused");
        _;
    }

    function pause() public onlyOwner{
        _pause();
    }

    function unpause() public onlyOwner{
        _unpause();
    }


    /**
     * @dev Called by a pauser to pause, triggers stopped state.
     */
    function _pause() internal whenNotPaused {
        _paused = true;
        emit Paused(msg.sender);
    }

    /**
     * @dev Called by a pauser to unpause, returns to normal state.
     */
    function _unpause() internal whenPaused {
        _paused = false;
        emit Unpaused(msg.sender);
    }
}

contract Portal is Ownable, Pausable {
    using SafeMath for uint256;
    using SafeMath for uint32;

    uint256 public totalXio;
    uint256 interestRate = 684931506849315;
    uint256 constant MAX_UINT = 2**256 - 1;
    uint256 constant ONE_DAY = 24*60*60;
    address xioExchangeAddress = 0xf9f62d768DaD7ccc2E60a115FFDAC88b9B8c70cc;
    address xioContractAddress = 0x5d3069CBb2BFb7ebB9566728E44EaFDaC3E52708;
    address uniswapFactoryAddress = 0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36;
    uint256 portalId = 0;

    //for testing
    uint256 constant ONE_MINUTE = 60;

    mapping (address=>StakerData[]) public stakerData;
    mapping (uint256=>PortalData) public portalData;
    mapping (address=>bool) internal whiteListed;

    struct StakerData {
        uint256 portalId;
        address publicKey;
        uint256 stakeQuantity;
        uint256 stakeDurationTimestamp;
        uint256 stakeInitiationTimestamp;
        string outputTokenSymbol;
    }

    struct PortalData {
        uint256 portalId;
        address tokenAddress;
        address tokenExchangeAddress;
        string outputTokenSymbol;
        uint256 xioStaked;
    }

    constructor() public {
        //To override the constructor of inherited contracts
    }

    event DataEntered(address staker, uint256  portalId, uint256 quantity); // When data is entered into the mapping
    event Tranferred(address staker, uint256  portalId, uint256 quantity, string symbol); // When bought tokens are transferred to staker
    event Bought(address staker, uint256  portalId, uint256 _tokensBought, string symbol); // When tokens are bought
    event Transfer(address to, uint256 value); // When tokens are withdrawn
    // event NotTransfer(address to, uint256 value); // When tokens are not withdrawn

    /* @dev to get total xio staked into the portal */
    function getTotalXIOStaked() public view returns (uint256) {
        return totalXio;
    }


    /* @dev to get interest rate of the portal */
    function getInterestRate() public view returns(uint256){
        return interestRate;
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

    /* @dev to check portal if it already exists or not
    *  @param _tokenAddress, address of output token
    */
    function checkPortalExists(address _tokenAddress) internal view returns (bool){
        bool exists;
        for(uint256 i=0; ;i++){
            if(portalData[i].tokenAddress == address(0)){
                exists = false;
                break;
            } else if(portalData[i].tokenAddress == _tokenAddress){
                exists = true;
                break;
            }
        }
        return exists;
    }

    /* @dev to check if user can wtihdraw their staked xio or not
    *  @param _amount , xio token quanity user has staked (in wei)
    *  @param _staker , public address of staker
    */
    // function canWithdrawXIO(uint256 _amount, address _staker) public view returns (bool) {
    //     bool done = false;
    //     StakerData[] storage stakerArray= stakerData[_staker];

    //     for(uint256 i=0; i<stakerArray.length;i++){
    //         if((stakerArray[i].stakeInitiationTimestamp.add(stakerArray[i].stakeDurationTimestamp)  <= block.timestamp) && (stakerArray[i].stakeQuantity.sub(_amount)   >= 0) && (stakerArray[i].publicKey != address(0))){
    //             done=true;
    //             break;
    //         }
    //     }
    //     if(!done){
    //         return false;
    //     }
    //     return true;

    // }


    /* @dev stake function which calls uniswaps exchange to buy output tokens and send them to the user.
    *  @param _quantity , xio token quanity user has staked (in wei)
    *  @param _xioQuantity, xio interest generated upon the days (in wei)
    *  @param _tokensBought, how much tokens are bought from the uniswaps exchange (in wei)
    *  @param _portalId, portal id of the exchange.
    *  @param _symbol, bought token symbol
    *  @param _outputTokenAddress, bought token ERC20 address
    *  @param _days, how much days he has staked (in days)
    */
    function stakeXIO( address _outputTokenAddress, uint256 _days, uint256 _xioQuantity, uint256 _tokensBought, uint256 _portalId) public whenNotPaused returns (bool) {

        require(_days>0, "Invalid Days");  // To check days
        require(_xioQuantity > 0 , "Invalid XIO quantity"); // To verify XIO quantity
        require(_outputTokenAddress != address(0),"0 address not allowed"); // To verify output token address
        require(isContract(_outputTokenAddress) != false, "Not a contract address"); // To verify address is contract or not
        require(portalData[_portalId].tokenAddress != address(0), "Portal does not exists"); // To verify portal info
        require(whiteListed[msg.sender] == true, "Not whitelist address"); //To verify whitelisters
        require(portalData[_portalId].tokenAddress == _outputTokenAddress, "Wrong portal"); //To check correct portal

        // stakerData[msg.sender].push(StakerData(_portalId, msg.sender, _xioQuantity, _days*ONE_DAY, block.timestamp, _symbol));

        stakerData[msg.sender].push(StakerData(_portalId, msg.sender, _xioQuantity, _days.mul(ONE_MINUTE), block.timestamp, portalData[_portalId].outputTokenSymbol));

        emit DataEntered(msg.sender,_portalId,_xioQuantity);

        portalData[_portalId].xioStaked = portalData[_portalId].xioStaked.add(_xioQuantity)  ;

        totalXio = totalXio + _xioQuantity;

        Token(xioContractAddress).transferFrom(msg.sender, address(this),_xioQuantity);

        uint256 soldXIO = (_xioQuantity.mul(interestRate).mul(_days)).div(1000000000000000000);

        uint256 bought = UniswapExchangeInterface(xioExchangeAddress).tokenToTokenSwapInput(soldXIO,_tokensBought,1,1839591241,_outputTokenAddress);

        if(bought > 0){
            emit Bought(msg.sender,_portalId,_tokensBought,portalData[_portalId].outputTokenSymbol);
            Token(portalData[_portalId].tokenAddress).transfer(msg.sender,_tokensBought);
            emit Tranferred(msg.sender,_portalId,_tokensBought,portalData[_portalId].outputTokenSymbol);
            return true;
        }
        return false;
    }

    /* @dev withdrwal function by which user can withdraw their staked xio
    *  @param _amount , xio token quanity user has staked (in wei)
    */
    function withdrawXIO(uint256 _amount) public whenNotPaused {
        require(_amount>0, "Amount should be greater than 0");
        bool done = false;
        StakerData[] storage stakerArray= stakerData[msg.sender];
        for(uint256 i=0; i<stakerArray.length;i++){
            if((stakerArray[i].stakeInitiationTimestamp.add(stakerArray[i].stakeDurationTimestamp)  <= block.timestamp) && (stakerArray[i].stakeQuantity >= _amount) && (stakerArray[i].publicKey != address(0))){
                Token(xioContractAddress).transfer(msg.sender,_amount);
                emit Transfer(msg.sender,_amount);
                stakerArray[i].stakeQuantity = stakerArray[i].stakeQuantity.sub(_amount);
                portalData[stakerArray[i].portalId].xioStaked = portalData[stakerArray[i].portalId].xioStaked.sub( _amount);
                totalXio = totalXio.sub(_amount);
                if(stakerArray[i].stakeQuantity==0){
                    stakerArray[i].publicKey = 0x0000000000000000000000000000000000000000;
                }
                done=true;
                break;
            }
        }
        require(done == true, "Not transferred");

    }


    /* @dev to add portal into the contract
    *  @param _tokenAddress, address of output token
    */
    function addPortal(address _tokenAddress) public onlyOwner whenNotPaused returns(bool) {
        require(_tokenAddress != address(0), "Zero address not allowed");
        require(checkPortalExists(_tokenAddress) == false , "Portal already exists");
        address exchangeAddress = UniswapFactoryInterface(uniswapFactoryAddress).getExchange(_tokenAddress);
        require(exchangeAddress != address(0));
        string memory symbol = Token(_tokenAddress).symbol();
        portalData[portalId] = PortalData(portalId, _tokenAddress, exchangeAddress, symbol, 0);
        portalId++;
        return true;
    }

    /* @dev to delete portal into the contract
    *  @param _portalId, portal Id of portal
    */
    function removePortal(uint256 _portalId) public onlyOwner whenNotPaused returns(bool) {
        require(_portalId >0 , "Invalid Portal id");
        require(portalData[_portalId].tokenAddress != address(0),"Portal does not exist");
        portalData[_portalId] = PortalData(_portalId, 0x0000000000000000000000000000000000000000, 0x0000000000000000000000000000000000000000, "NONE", 0);
        return true;
    }

    /* @dev to set interest rate. Can only be called by owner
    *  @param _rate, interest rate (in wei)
    */
    function setInterestRate(uint256 _rate) public onlyOwner whenNotPaused returns(bool) {
        require(_rate != 0, "Rate connot be zero");
        interestRate = _rate;
    }

    /* @dev to allow XIO exchange max XIO tokens from the portal, can only be called by owner */
    function allowXIO() public onlyOwner whenNotPaused returns(bool) {
        return Token(xioContractAddress).approve(xioExchangeAddress, MAX_UINT);
    }

    /* @dev to add whitelist addresses // for front end feasiblity
    *  @param __staker, array of staker address
    */
    function addWhiteListAccount(address[] memory _staker) public onlyOwner whenNotPaused {
        for(uint8 i=0; i<_staker.length;i++){
            require(_staker[i] != address(0), "Zero address not allowed");
            whiteListed[_staker[i]]=true;
        }
    }

    /* @dev to add whitelist addresses // for front end feasiblity
    *  @param _exchangeAddress, xio exchange address
    */
    function setXIOExchangeAddress(address _exchangeAddress) public onlyOwner whenNotPaused {
        require(_exchangeAddress != address(0), "Zero address not allowed");
        xioExchangeAddress = _exchangeAddress;
    }
}

