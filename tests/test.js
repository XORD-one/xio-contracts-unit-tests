var assert = require('assert');
var expect = require('chai').expect
var Web3 = require('web3')
const contants = require('../utils/constants')


const OPTIONS = {
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
};

const web3 = new Web3("https://rinkeby.infura.io/v3/30c8e7bd8d0047648aedbd43d539b376", null, OPTIONS)

let contract = ''

let ethSoldAmount = ''

let altBuyAmount = ''

const ownerPublicKey = '0xe7Ef8E1402055EB4E89a57d1109EfF3bAA334F5F'

const ownerPrivateKey = '0xD7D0054C3FE49AF9260AD190D0380EC99F4CCAAAFF07755309D2B49BFB7C9DE2'

const secondPrivateKey = '0x79D9FF31D885D96B887CAF34C0D1282EA3666F731D78A57EFADAFA4278C8E65C'

const secondPublicKey = '0x31Edebea67E8b6F398F3CA23CC0E6dA491798fbc'

let portalAddress = '0xEb08b912d283025faF397EE178c805986c0DF501'
let xioAddress = '0x5d3069CBb2BFb7ebB9566728E44EaFDaC3E52708'
let omgAddress = '0x879884c3C46A24f56089f3bBbe4d5e38dB5788C0'
let xioExchangeAddress = '0xf9f62d768DaD7ccc2E60a115FFDAC88b9B8c70cc'
let omgExchangeAddress = '0x26C226EBb6104676E593F8A070aD6f25cDa60F8D'
let factoryAddress = '0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36'
let zeroXAddress = '0xF22e3F33768354c9805d046af3C0926f27741B43'
let daiAddress = '0x2448eE2641d78CC42D7AD76498917359D961A783'
let interestRate = 684931506849315
let zeroXPortalId = 1
let daiPortalId = 2

/*** basic tests ***/
describe('Portal Test', async () => {
    describe('OWNER ADDRESS ', async () => {
        describe("When not paused", async () => {
            //Interest rate
            describe('Set Interest Rate', async () => {
                it('Should set interest rate because it is set by owner', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")


                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.setInterestRate(interestRate).encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('error', (err) => {
                            console.log(err)
                        }).on('transactionHash', (hash) => {
                            console.log(hash)
                        }).on('confirmation', (confirmationNumber, receipt) => {
                            if (confirmationNumber === 1) {
                                console.log(receipt)
                            }
                        })

                    expect(tx.status).to.equal(true)
                });

                it('Interest rate is equal to ', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);

                    let rate = await contract.methods.getInterestRate().call()

                    expect(Number(rate)).to.equal(interestRate)
                });

                it('Should not set interest rate because it is not set by owner', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(secondPublicKey, "pending")


                    let txObject = {
                        from: secondPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.setInterestRate(interestRate).encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, secondPrivateKey)
                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })

                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

                it('Should not set interest rate because it is 0', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")


                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.setInterestRate(0).encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)
                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })

                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });
            });
            //Add portal
            describe('Add Portal', async () => {
                it('Should Add Portal', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")
                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.addPortal(zeroXAddress).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('error', (err) => {
                            console.log(err)
                        }).on('transactionHash', (hash) => {
                            console.log(hash)
                        }).on('confirmation', (confirmationNumber, receipt) => {
                            if (confirmationNumber === 1) {
                                console.log(receipt)
                            }
                        })
                    expect(tx.status).to.equal(true)
                });

                it('Portal address is equal to token address', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);

                    let portal = await contract.methods.portalData(zeroXPortalId).call()

                    expect(portal.tokenAddress).to.equal(zeroXAddress)
                });

                it('Should Not Add Portal because exchange address is zero address', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")
                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.addPortal('0x0000000000000000000000000000000000000000').encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }

                });

                it('Should not add portal because ZEROX Portal already exists', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")
                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.addPortal(zeroXAddress).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });
            })

            //Add whitelisters
            describe('Add Whitelisters', async () => {
                it('Should Add Whitelisters', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")
                    let whitelisted = ["0xe7Ef8E1402055EB4E89a57d1109EfF3bAA334F5F", "0x31Edebea67E8b6F398F3CA23CC0E6dA491798fbc", "0xe362f0e3561e02b8ecfc5e2defc65e007ff87d72"]
                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.addWhiteListAccount(whitelisted).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('error', (err) => {
                            console.log(err)
                        }).on('transactionHash', (hash) => {
                            console.log(hash)
                        }).on('confirmation', (confirmationNumber, receipt) => {
                            if (confirmationNumber === 1) {
                                console.log(receipt)
                            }
                        })
                    expect(tx.status).to.equal(true)
                });

                it('Should not add whitelisters because it contains zero address', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")
                    let whitelisted = ["0x0000000000000000000000000000000000000000", "0x31Edebea67E8b6F398F3CA23CC0E6dA491798fbc", "0xe362f0e3561e02b8ecfc5e2defc65e007ff87d72"]
                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.addWhiteListAccount(whitelisted).encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

                it('Should not add whitelisters because of non owner address', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(secondPublicKey, "pending")
                    let whitelisted = ["0xe7Ef8E1402055EB4E89a57d1109EfF3bAA334F5F", "0x31Edebea67E8b6F398F3CA23CC0E6dA491798fbc", "0xe362f0e3561e02b8ecfc5e2defc65e007ff87d72"]
                    let txObject = {
                        from: secondPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.addWhiteListAccount(whitelisted).encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, secondPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

            })

            //Set XIO exchange address
            describe('Set XIO exchange address', async () => {
                it('Should set XIO exhcnage address', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.setXIOExchangeAddress(xioExchangeAddress).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('error', (err) => {
                            console.log(err)
                        }).on('transactionHash', (hash) => {
                            console.log(hash)
                        }).on('confirmation', (confirmationNumber, receipt) => {
                            if (confirmationNumber === 1) {
                                console.log(receipt)
                            }
                        })
                    expect(tx.status).to.equal(true)
                });

                it('Xio exchange address is equal to exchange address', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);

                    let address = await contract.methods.xioExchangeAddress().call()

                    expect(address).to.equal(xioExchangeAddress)
                });

                it('Should not set XIO exchange address because of zero address', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")
                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.setXIOExchangeAddress('0x0000000000000000000000000000000000000000').encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

                it('Should not set XIO exhcnage address because of non owner', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(secondPublicKey, "pending")

                    let txObject = {
                        from: secondPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.setXIOExchangeAddress(xioExchangeAddress).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, secondPrivateKey)

                    let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('error', (err) => {
                            console.log(err)
                        }).on('transactionHash', (hash) => {
                            console.log(hash)
                        }).on('confirmation', (confirmationNumber, receipt) => {
                            if (confirmationNumber === 1) {
                                console.log(receipt)
                            }
                        })
                    expect(tx.status).to.equal(true)
                });

            })

            //Remove portal
            describe('Remove portal', async () => {
                it('Should not remove portal because of non owner address', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(secondPublicKey, "pending")

                    let txObject = {
                        from: secondPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.removePortal(zeroXPortalId).encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, secondPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

                it('Should remove  portal', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.removePortal(zeroXPortalId).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('error', (err) => {
                            console.log(err)
                        }).on('transactionHash', (hash) => {
                            console.log(hash)
                        }).on('confirmation', (confirmationNumber, receipt) => {
                            if (confirmationNumber === 1) {
                                console.log(receipt)
                            }
                        })
                    expect(tx.status).to.equal(true)
                });

                it('Portal is removed', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);

                    let portal = await contract.methods.portalData(zeroXPortalId).call()

                    expect(portal.tokenAddress).to.equal('0x0000000000000000000000000000000000000000')
                });

                it('Should not remove portal because it does not exist', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.removePortal(zeroXPortalId).encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

            })

            describe('Allow XIO', async () => {
                it('Should allow XIO', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.allowXIO().encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('error', (err) => {
                            console.log(err)
                        }).on('transactionHash', (hash) => {
                            console.log(hash)
                        }).on('confirmation', (confirmationNumber, receipt) => {
                            if (confirmationNumber === 1) {
                                console.log(receipt)
                            }
                        })
                    expect(tx.status).to.equal(true)
                });

                it('Allowance of xio exchange is greater than 0 ', async ()=>{
                    let xioContract = await web3.eth.Contract(contants.ABI_XIO,xioAddress)

                    let allowance = await xioContract.method.allowance(portalAddress,xioExchangeAddress)

                    expect(Number(allowance)).to.not.equal(0)
                })

                it('Should not allow XIO because non owner invoking it', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(secondPublicKey, "pending")

                    let txObject = {
                        from: secondPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.allowXIO().encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, secondPrivateKey)

                    let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('error', (err) => {
                            console.log(err)
                        }).on('transactionHash', (hash) => {
                            console.log(hash)
                        }).on('confirmation', (confirmationNumber, receipt) => {
                            if (confirmationNumber === 1) {
                                console.log(receipt)
                            }
                        })
                    expect(tx.status).to.equal(true)
                });
            })

        })
        describe("Public functions", async () => {

            describe('Get XIO To ETH', async () => {

                it('Should Return ETH Price', async () => {

                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let tokenAmount = await web3.utils.toWei((100 * 0.000684931506849315 * 1).toString())
                    let tx = await contract.methods.getXIOtoETH(tokenAmount).call()
                    console.log(tx)
                    let eth = await web3.utils.fromWei(tx)
                    ethSoldAmount = eth
                    console.log(ethSoldAmount)
                    if (tx) {
                        expect(true).to.equal(true)
                    } else {
                        expect(false).to.equal(true)
                    }
                });


            });

            describe('Get ETH To OMG', async () => {

                it('Should Return OMG to ETH', async () => {

                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let eth = await web3.utils.toWei(ethSoldAmount)
                    let tx = await contract.methods.getETHtoALT(eth, omgExchangeAddress).call()
                    altBuyAmount = tx
                    if (tx) {
                        expect(true).to.equal(true)
                    } else {
                        expect(false).to.equal(true)
                    }
                });

            });


            describe('Stake', async () => {

                it('Should work perfectly because all params are correct', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let xioQuantity = await web3.utils.toWei((100).toString())

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.stakeXIO(omgAddress, 1, xioQuantity, altBuyAmount, 0).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('error', (err) => {
                            console.log(err)
                        }).on('transactionHash', (hash) => {
                            console.log(hash)
                        }).on('confirmation', (confirmationNumber, receipt) => {
                            if (confirmationNumber === 1) {
                                console.log(receipt)
                            }
                        })
                    expect(tx.status).to.equal(true)

                });

                it('Should not work perfectly because days are 0', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let xioQuantity = await web3.utils.toWei((100).toString())

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.stakeXIO(omgAddress, 0, xioQuantity, altBuyAmount, 0).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }

                });

                it('Should not work perfectly because xio quantity is 0', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let xioQuantity = await web3.utils.toWei((0).toString())

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.stakeXIO(omgAddress, 1, xioQuantity, altBuyAmount, 0).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }

                });

                it('Should not work perfectly because output token address is 0', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let xioQuantity = await web3.utils.toWei((100).toString())

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.stakeXIO('0x0000000000000000000000000000000000000000', 1, xioQuantity, altBuyAmount, 0).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }

                });

                it('Should not work perfectly because output token address is person address', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let xioQuantity = await web3.utils.toWei((100).toString())

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.stakeXIO(secondPublicKey, 1, xioQuantity, altBuyAmount, 0).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }

                });

                it('Should not work perfectly because portal does not exists', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let xioQuantity = await web3.utils.toWei((100).toString())

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.stakeXIO(omgAddress, 1, xioQuantity, altBuyAmount, 2).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

                it('Should not work perfectly because portal exists but wrong output token address', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let xioQuantity = await web3.utils.toWei((100).toString())

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.stakeXIO(zeroXAddress, 1, xioQuantity, altBuyAmount, 0).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }

                });

            })

            describe('Withdraw', async () => {
                it('Should work perfectly', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let xioQuantity = await web3.utils.toWei((100).toString())

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.withdrawXIO(xioQuantity).encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, privateKey)

                    let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('error', (err) => {
                            console.log(err)
                        }).on('transactionHash', (hash) => {
                            console.log(hash)
                        }).on('confirmation', (confirmationNumber, receipt) => {
                            if (confirmationNumber === 1) {
                                console.log(receipt)
                            }
                        })
                    expect(tx.status).to.equal(true)
                });

                it('Should not work because amount is 0', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.withdrawXIO('0').encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }

                });

            });

        })

        describe("When paused", async () => {
            describe('Pausing the contract', async () => {

                it('Should not pause because of non owner', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(secondPublicKey, "pending")

                    let txObject = {
                        from: secondPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.pasue().encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, secondPublicKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }

                });

                it('Should pause the contract', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.pasue().encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('error', (err) => {
                            console.log(err)
                        }).on('transactionHash', (hash) => {
                            console.log(hash)
                        }).on('confirmation', (confirmationNumber, receipt) => {
                            if (confirmationNumber === 1) {
                                console.log(receipt)
                            }
                        })
                    expect(tx.status).to.equal(true)
                });

            })

            describe('Executing functions after pausing', async () => {
                it('Should not set interest rate because contract is paused', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")


                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.setInterestRate(interestRate).encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

                it('Should not Add Portal because contract is paused', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")
                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.addPortal(zeroXAddress).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

                it('Should not add whitelisters because contract is paused', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")
                    let whitelisted = ["0xe7Ef8E1402055EB4E89a57d1109EfF3bAA334F5F", "0x31Edebea67E8b6F398F3CA23CC0E6dA491798fbc", "0xe362f0e3561e02b8ecfc5e2defc65e007ff87d72"]
                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.addWhiteListAccount(whitelisted).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

                it('Should not set XIO exhcnage address becasue contract is paused', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.setXIOExchangeAddress(xioExchangeAddress).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

                it('Should not remove portal because contract is paused', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.removePortal(0).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

                it('Should not allow XIO because contract is paused', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.allowXIO().encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                })

                it('Should Return ETH Price', async () => {

                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let tokenAmount = await web3.utils.toWei((100 * 0.000684931506849315 * 1).toString())
                    let tx = await contract.methods.getXIOtoETH(tokenAmount).call()
                    console.log(tx)
                    let eth = await web3.utils.fromWei(tx)
                    ethSoldAmount = eth
                    console.log(ethSoldAmount)
                    if (tx) {
                        expect(true).to.equal(true)
                    } else {
                        expect(false).to.equal(true)
                    }
                });

                it('Should Return OMG to ETH', async () => {

                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let eth = await web3.utils.toWei(ethSoldAmount)
                    let tx = await contract.methods.getETHtoALT(eth, omgExchangeAddress).call()
                    altBuyAmount = tx
                    if (tx) {
                        expect(true).to.equal(true)
                    } else {
                        expect(false).to.equal(true)
                    }
                });

                it('Should not stake perfectly because contract is paused ', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let xioQuantity = await web3.utils.toWei((100).toString())

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.stakeXIO(omgAddress, 1, xioQuantity, altBuyAmount, 0).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }

                });

                it('Should not withdraw perfectly because contract is paused', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let xioQuantity = await web3.utils.toWei((100).toString())

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.withdrawXIO(xioQuantity).encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, privateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });


            })


        });

        describe("When unpause after pause", async () => {
            describe("Unpausing", async () => {
                it('Should not unpause because of non owner', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(secondPublicKey, "pending")

                    let txObject = {
                        from: secondPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.unpasue().encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, secondPublicKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }

                });

                it('Should unpause the contract', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let txObject = {
                        from: ownerPublicKey,
                        to: ownerPrivateKey,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.unpasue().encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, privateKey)

                    let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('error', (err) => {
                            console.log(err)
                        }).on('transactionHash', (hash) => {
                            console.log(hash)
                        }).on('confirmation', (confirmationNumber, receipt) => {
                            if (confirmationNumber === 1) {
                                console.log(receipt)
                            }
                        })
                    expect(tx.status).to.equal(true)
                });
            })

            describe('Executing functions after unpausing', async () => {
                it('Should set interest rate', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")


                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.setInterestRate(interestRate).encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

                it('Interest rate is equal to ', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);

                    let rate = await contract.methods.getInterestRate().call()

                    expect(Number(rate)).to.equal(interestRate)
                });

                it('Should Add Portal', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")
                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.addPortal(daiAddress).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

                it('Portal address is equal to token address', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);

                    let portal = await contract.methods.portalData(daiPortalId).call()

                    expect(portal.tokenAddress).to.equal(daiAddress)
                });

                it('Should add whitelisters', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")
                    let whitelisted = ["0xe7Ef8E1402055EB4E89a57d1109EfF3bAA334F5F", "0x31Edebea67E8b6F398F3CA23CC0E6dA491798fbc", "0xe362f0e3561e02b8ecfc5e2defc65e007ff87d72"]
                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.addWhiteListAccount(whitelisted).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

                it('Should set XIO exhcnage address', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.setXIOExchangeAddress(xioExchangeAddress).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

                it('Xio exchange address is equal to exchange address', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);

                    let address = await contract.methods.xioExchangeAddress().call()

                    expect(address).to.equal(xioExchangeAddress)
                });

                it('Should remove portal', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.removePortal(daiPortalId).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

                it('Portal is removed', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);

                    let portal = await contract.methods.portalData(daiPortalId).call()

                    expect(portal.tokenAddress).to.equal('0x0000000000000000000000000000000000000000')
                });

                it('Should allow XIO', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.allowXIO().encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                })

                it('Allowance of xio exchange is greater than 0 ', async ()=>{
                    let xioContract = await web3.eth.Contract(contants.ABI_XIO,xioAddress)

                    let allowance = await xioContract.method.allowance(portalAddress,xioExchangeAddress)

                    expect(Number(allowance)).to.not.equal(0)
                })



                it('Should Return ETH Price', async () => {

                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let tokenAmount = await web3.utils.toWei((100 * 0.000684931506849315 * 1).toString())
                    let tx = await contract.methods.getXIOtoETH(tokenAmount).call()
                    console.log(tx)
                    let eth = await web3.utils.fromWei(tx)
                    ethSoldAmount = eth
                    console.log(ethSoldAmount)
                    if (tx) {
                        expect(true).to.equal(true)
                    } else {
                        expect(false).to.equal(true)
                    }
                });

                it('Should Return OMG to ETH', async () => {

                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let eth = await web3.utils.toWei(ethSoldAmount)
                    let tx = await contract.methods.getETHtoALT(eth, omgExchangeAddress).call()
                    altBuyAmount = tx
                    if (tx) {
                        expect(true).to.equal(true)
                    } else {
                        expect(false).to.equal(true)
                    }
                });

                it('Should work perfectly staking ', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let xioQuantity = await web3.utils.toWei((100).toString())

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.stakeXIO(omgAddress, 1, xioQuantity, altBuyAmount, 0).encodeABI()
                    }


                    let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }

                });

                it('Should  withdraw perfectly', async () => {
                    contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
                    let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

                    let xioQuantity = await web3.utils.toWei((100).toString())

                    let txObject = {
                        from: ownerPublicKey,
                        to: portalAddress,
                        gasPrice: 25 * 1000000000,
                        gasLimit: 1000000,
                        chainId: 4,
                        nonce: web3.utils.toHex(count),
                        data: contract.methods.withdrawXIO(xioQuantity).encodeABI()
                    }

                    let signed = await web3.eth.accounts.signTransaction(txObject, privateKey)

                    try {
                        let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
                            .on('error', (err) => {
                                console.log(err)
                            }).on('transactionHash', (hash) => {
                                console.log(hash)
                            }).on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber === 1) {
                                    console.log(receipt)
                                }
                            })
                        expect(tx.status).to.equal(true)
                    } catch (e) {
                        expect(false).to.equal(true)
                    }
                });

            })

        })

    })
})