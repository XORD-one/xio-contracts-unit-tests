var assert = require('assert');
var expect = require('chai').expect
var Web3 = require('web3')
const contants = require('./utils/constants')


const OPTIONS = {
    // defaultBlock: "latest",
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

let portalAddress = '0x5ABFC42A4a2081BBeBB3cF72D0740Eb94dA8E4E7'
let xioAddress = '0x5d3069CBb2BFb7ebB9566728E44EaFDaC3E52708'
let omgAddress = '0x879884c3C46A24f56089f3bBbe4d5e38dB5788C0'
let xioExchangeAddress = '0xf9f62d768DaD7ccc2E60a115FFDAC88b9B8c70cc'
let omgExchangeAddress = '0x26C226EBb6104676E593F8A070aD6f25cDa60F8D'
let factoryAddress = '0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36'

/*** basic tests ***/
describe('Portal Test', function () {
    // describe('Set Interest Rate', function () {
    //     it('Should set interest rate because it is set by owner', async function() {
    //         contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
    //         let count = await web3.eth.getTransactionCount(publicKey, "pending")
    //
    //
    //         let txObject = {
    //             from: publicKey,
    //             to: portalAddress,
    //             gasPrice: 25 * 1000000000,
    //             gasLimit: 1000000,
    //             chainId: 4,
    //             nonce: web3.utils.toHex(count),
    //             data: contract.methods.setInterestRate(684931506849315).encodeABI()
    //         }
    //
    //         let signed = await web3.eth.accounts.signTransaction(txObject, privateKey)
    //
    //         let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
    //
    //         expect(tx.status).to.equal(true)
    //     });
    //
    //     it('Should not set interest rate because it is not set by owner', async function() {
    //         contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
    //         let count = await web3.eth.getTransactionCount(publicKey, "pending")
    //
    //
    //         let txObject = {
    //             from: publicKey,
    //             to: portalAddress,
    //             gasPrice: 25 * 1000000000,
    //             gasLimit: 1000000,
    //             chainId: 4,
    //             nonce: web3.utils.toHex(count),
    //             data: contract.methods.setInterestRate(684931506849315).encodeABI()
    //         }
    //
    //         let signed = await web3.eth.accounts.signTransaction(txObject, privateKey)
    //         try{
    //             let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
    //         }catch (e) {
    //             expect(false).to.equal(false)
    //         }
    //     });
    //
    //     it('Should not set interest rate because it is 0', async function() {
    //         contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
    //         let count = await web3.eth.getTransactionCount(publicKey, "pending")
    //
    //
    //         let txObject = {
    //             from: publicKey,
    //             to: portalAddress,
    //             gasPrice: 25 * 1000000000,
    //             gasLimit: 1000000,
    //             chainId: 4,
    //             nonce: web3.utils.toHex(count),
    //             data: contract.methods.setInterestRate(0).encodeABI()
    //         }
    //
    //         let signed = await web3.eth.accounts.signTransaction(txObject, privateKey)
    //         try{
    //             let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
    //         }catch (e) {
    //             expect(false).to.equal(false)
    //         }
    //     });
    //
    //
    //     it('Should not set interest rate because it is 0', async function() {
    //         contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
    //         let count = await web3.eth.getTransactionCount(publicKey, "pending")
    //
    //
    //         let txObject = {
    //             from: publicKey,
    //             to: portalAddress,
    //             gasPrice:25 * 1000000000,
    //             gasLimit: 1000000,
    //             chainId: 4,
    //             nonce: web3.utils.toHex(count),
    //             data: contract.methods.setInterestRate(0).encodeABI()
    //         }
    //
    //         let signed = await web3.eth.accounts.signTransaction(txObject, privateKey)
    //         try{
    //             let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
    //         }catch (e) {
    //             expect(false).to.equal(false)
    //         }
    //     });
    // });
    // describe('Add Portal', function () {
    //     it('Should Add Portal', async function () {
    //         contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
    //         let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")
    //         let txObject = {
    //             from: ownerPublicKey,
    //             to: portalAddress,
    //             gasPrice: 25 * 1000000000,
    //             gasLimit: 1000000,
    //             chainId: 4,
    //             nonce: web3.utils.toHex(count),
    //             data: contract.methods.addPortal(omgAddress, omgExchangeAddress, "OMG").encodeABI()
    //         }
    //
    //         // console.log('1000000000000000000',quantity, altBuyAmount,  2 * 60 * 1000, 1, "ZRX", omgAddress)
    //
    //         let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)
    //
    //         let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
    //             .on('error', (err) => {
    //                 console.log(err)
    //             }).on('transactionHash', (hash) => {
    //                 console.log(hash)
    //             }).on('confirmation', (confirmationNumber, receipt) => {
    //                 if (confirmationNumber === 1) {
    //                     console.log(receipt)
    //                 }
    //             })
    //         expect(tx.status).to.equal(true)
    //     });
    //
    //     it('Should Not Add Portal because exchange address is zero address', async function () {
    //         contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
    //         let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")
    //         let txObject = {
    //             from: ownerPublicKey,
    //             to: portalAddress,
    //             gasPrice: 25 * 1000000000,
    //             gasLimit: 1000000,
    //             chainId: 4,
    //             nonce: web3.utils.toHex(count),
    //             data: contract.methods.addPortal(omgAddress, '0x0000000000000000000000000000000000000000', "OMG").encodeABI()
    //         }
    //
    //         // console.log('1000000000000000000',quantity, altBuyAmount,  2 * 60 * 1000, 1, "ZRX", omgAddress)
    //
    //         let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)
    //
    //         let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
    //             .on('error', (err) => {
    //                 console.log(err)
    //             }).on('transactionHash', (hash) => {
    //                 console.log(hash)
    //             }).on('confirmation', (confirmationNumber, receipt) => {
    //                 if (confirmationNumber === 1) {
    //                     console.log(receipt)
    //                 }
    //             })
    //         expect(tx.status).to.equal(true)
    //     });
    //
    //     it('Should Not Add Portal because  address is zero address', async function () {
    //         contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
    //         let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")
    //         let txObject = {
    //             from: ownerPublicKey,
    //             to: portalAddress,
    //             gasPrice: 25 * 1000000000,
    //             gasLimit: 1000000,
    //             chainId: 4,
    //             nonce: web3.utils.toHex(count),
    //             data: contract.methods.addPortal('0x0000000000000000000000000000000000000000', omgExchangeAddress, "OMG").encodeABI()
    //         }
    //
    //         // console.log('1000000000000000000',quantity, altBuyAmount,  2 * 60 * 1000, 1, "ZRX", omgAddress)
    //
    //         let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)
    //
    //         let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
    //             .on('error', (err) => {
    //                 console.log(err)
    //             }).on('transactionHash', (hash) => {
    //                 console.log(hash)
    //             }).on('confirmation', (confirmationNumber, receipt) => {
    //                 if (confirmationNumber === 1) {
    //                     console.log(receipt)
    //                 }
    //             })
    //         expect(tx.status).to.equal(true)
    //     });
    //
    //     it('Should Not Add Portal because portal already exists', async function () {
    //         contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
    //         let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")
    //         let txObject = {
    //             from: ownerPublicKey,
    //             to: portalAddress,
    //             gasPrice: 25 * 1000000000,
    //             gasLimit: 1000000,
    //             chainId: 4,
    //             nonce: web3.utils.toHex(count),
    //             data: contract.methods.addPortal(omgAddress, omgExchangeAddress, "OMG").encodeABI()
    //         }
    //
    //         // console.log('1000000000000000000',quantity, altBuyAmount,  2 * 60 * 1000, 1, "ZRX", omgAddress)
    //
    //         let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)
    //
    //         let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
    //             .on('error', (err) => {
    //                 console.log(err)
    //             }).on('transactionHash', (hash) => {
    //                 console.log(hash)
    //             }).on('confirmation', (confirmationNumber, receipt) => {
    //                 if (confirmationNumber === 1) {
    //                     console.log(receipt)
    //                 }
    //             })
    //         expect(tx.status).to.equal(true)
    //     });
    //
    // });
    //
    // describe('Add whitelisters', function () {
    //     it('Should Add Whitelisted address', async function () {
    //         contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
    //         let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")
    //         let whitelisted = ["0xe7Ef8E1402055EB4E89a57d1109EfF3bAA334F5F" ,  "0x31Edebea67E8b6F398F3CA23CC0E6dA491798fbc", "0xe362f0e3561e02b8ecfc5e2defc65e007ff87d72"]
    //         let txObject = {
    //             from: ownerPublicKey,
    //             to: portalAddress,
    //             gasPrice: 25 * 1000000000,
    //             gasLimit: 1000000,
    //             chainId: 4,
    //             nonce: web3.utils.toHex(count),
    //             data: contract.methods.addWhiteListAccount(whitelisted).encodeABI()
    //         }
    //
    //         // console.log('1000000000000000000',quantity, altBuyAmount,  2 * 60 * 1000, 1, "ZRX", omgAddress)
    //
    //         let signed = await web3.eth.accounts.signTransaction(txObject, ownerPrivateKey)
    //
    //         let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
    //             .on('error', (err) => {
    //                 console.log(err)
    //             }).on('transactionHash', (hash) => {
    //                 console.log(hash)
    //             }).on('confirmation', (confirmationNumber, receipt) => {
    //                 if (confirmationNumber === 1) {
    //                     console.log(receipt)
    //                 }
    //             })
    //         expect(tx.status).to.equal(true)
    //     });
    //
    // });


    describe('Get XIO To ETH', function () {
        it('Should Return ETH Price', async function () {
            contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
            let tokenAmount = await web3.utils.toWei((1*0.0006849315*10).toString())
            console.log(tokenAmount)
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
    //

    describe('Get ETH To OMG', function () {
        it('Should Return OMG to ETH', async function () {
            contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
            let eth = await web3.utils.toWei(ethSoldAmount)
            let tx = await contract.methods.getETHtoALT(eth, omgExchangeAddress).call()
            altBuyAmount = tx
            console.log(altBuyAmount)
            if (tx) {
                expect(true).to.equal(true)
            } else {
                expect(false).to.equal(true)
            }
            // 14284209926228481
        });

    });



    describe('Stake', function () {
        it('Should work perfectly because all params are correct', async function () {
            contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
            let count = await web3.eth.getTransactionCount(ownerPublicKey, "pending")

            // let onDayQuantity = await web3.utils.toWei((1*0.0006849315).toString())
            let xioQuantity = await web3.utils.toWei((100).toString())
            // console.log(soldDayQuantity/onDayQuantity)
            let quantity = await web3.utils.toWei('10')
            // let tokenBought =
            //     await web3.utils.toWei('0.000009553545941302')
            let txObject = {
                from: ownerPublicKey,
                to: portalAddress,
                gasPrice: 25 * 1000000000,
                gasLimit: 1000000,
                chainId: 4,
                nonce: web3.utils.toHex(count),
                data: contract.methods.stakeXIO(omgAddress,10, xioQuantity,  altBuyAmount, 0, "OMG").encodeABI()
            }

            // console.log('1000000000000000000',quantity, altBuyAmount,  2 * 60 * 1000, 1, "ZRX", omgAddress)

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
            // 14284209926228481
        });




        // it('Should fail because quantity of xio is zero', async function () {
        //     contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
        //     let count = await web3.eth.getTransactionCount(publicKey, "pending")
        //
        //     let quantity = await web3.utils.toWei((1*0.0006849315).toString())
        //     // let tokenBought =
        //     //     await web3.utils.toWei('0.000009553545941302')
        //     let txObject = {
        //         from: publicKey,
        //         to: portalAddress,
        //         gasPrice: 25 * 1000000000,
        //         gasLimit: 1000000,
        //         chainId: 4,
        //         nonce: web3.utils.toHex(count),
        //         data: contract.methods.stakeXIO('0',quantity, altBuyAmount,  2 * 60 * 1000, 1, "ZRX", omgAddress).encodeABI()
        //     }
        //
        //     let signed = await web3.eth.accounts.signTransaction(txObject, privateKey)
        //
        //     let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
        //         .on('error', (err) => {
        //             expect(false).to.equal(false)
        //         }).on('transactionHash', (hash) => {
        //             console.log(hash)
        //         }).on('confirmation', (confirmationNumber, receipt) => {
        //             if (confirmationNumber === 1) {
        //                 console.log(receipt)
        //             }
        //         })
        // });
        //
        // it('Should fail because quantity of quantity is zero', async function () {
        //     contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
        //     let count = await web3.eth.getTransactionCount(publicKey, "pending")
        //
        //     let quantity = await web3.utils.toWei((1*0.0006849315).toString())
        //     // let tokenBought =
        //     //     await web3.utils.toWei('0.000009553545941302')
        //     let txObject = {
        //         from: publicKey,
        //         to: portalAddress,
        //         gasPrice: 25 * 1000000000,
        //         gasLimit: 1000000,
        //         chainId: 4,
        //         nonce: web3.utils.toHex(count),
        //         data: contract.methods.stakeXIO('1000000000000000000','0', altBuyAmount,  2 * 60 * 1000, 1, "ZRX", omgAddress).encodeABI()
        //     }
        //
        //     let signed = await web3.eth.accounts.signTransaction(txObject, privateKey)
        //
        //     let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
        //         .on('error', (err) => {
        //             console.log(err)
        //         }).on('transactionHash', (hash) => {
        //             console.log(hash)
        //         }).on('confirmation', (confirmationNumber, receipt) => {
        //             if (confirmationNumber === 1) {
        //                 console.log(receipt)
        //             }
        //         })
        //     expect(tx.status).to.equal(true)
        //     // 14284209926228481
        // });
        //
        // it('Should fail because quantity of alt amount is zero', async function () {
        //     contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
        //     let count = await web3.eth.getTransactionCount(publicKey, "pending")
        //
        //     let quantity = await web3.utils.toWei((1*0.0006849315).toString())
        //     // let tokenBought =
        //     //     await web3.utils.toWei('0.000009553545941302')
        //     let txObject = {
        //         from: publicKey,
        //         to: portalAddress,
        //         gasPrice: 25 * 1000000000,
        //         gasLimit: 1000000,
        //         chainId: 4,
        //         nonce: web3.utils.toHex(count),
        //         data: contract.methods.stakeXIO('1000000000000000000',quantity, '0',  2 * 60 * 1000, 1, "ZRX", omgAddress).encodeABI()
        //     }
        //
        //     let signed = await web3.eth.accounts.signTransaction(txObject, privateKey)
        //
        //     let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
        //         .on('error', (err) => {
        //             console.log(err)
        //         }).on('transactionHash', (hash) => {
        //             console.log(hash)
        //         }).on('confirmation', (confirmationNumber, receipt) => {
        //             if (confirmationNumber === 1) {
        //                 console.log(receipt)
        //             }
        //         })
        //     expect(tx.status).to.equal(true)
        //     // 14284209926228481
        // });
        //
        // it('Should fail because quantity of altContract is a user address', async function () {
        //     contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
        //     let count = await web3.eth.getTransactionCount(publicKey, "pending")
        //
        //     let quantity = await web3.utils.toWei((1*0.0006849315).toString())
        //     // let tokenBought =
        //     //     await web3.utils.toWei('0.000009553545941302')
        //     let txObject = {
        //         from: publicKey,
        //         to: portalAddress,
        //         gasPrice: 25 * 1000000000,
        //         gasLimit: 1000000,
        //         chainId: 4,
        //         nonce: web3.utils.toHex(count),
        //         data: contract.methods.stakeXIO('1000000000000000000',quantity, '0',  2 * 60 * 1000, 1, "ZRX", '0x0000000000000000000000000000000000000000').encodeABI()
        //     }
        //
        //     let signed = await web3.eth.accounts.signTransaction(txObject, privateKey)
        //
        //     let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
        //         .on('error', (err) => {
        //             console.log(err)
        //         }).on('transactionHash', (hash) => {
        //             console.log(hash)
        //         }).on('confirmation', (confirmationNumber, receipt) => {
        //             if (confirmationNumber === 1) {
        //                 console.log(receipt)
        //             }
        //         })
        //     expect(tx.status).to.equal(true)
        //     // 14284209926228481
        // });
        //
        // it('Should fail because duration is zero', async function () {
        //     contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
        //     let count = await web3.eth.getTransactionCount(publicKey, "pending")
        //
        //     let quantity = await web3.utils.toWei((1*0.0006849315).toString())
        //     // let tokenBought =
        //     //     await web3.utils.toWei('0.000009553545941302')
        //     let txObject = {
        //         from: publicKey,
        //         to: portalAddress,
        //         gasPrice: 25 * 1000000000,
        //         gasLimit: 1000000,
        //         chainId: 4,
        //         nonce: web3.utils.toHex(count),
        //         data: contract.methods.stakeXIO('1000000000000000000',quantity, '0',  0, 1, "ZRX", '0x0000000000000000000000000000000000000000').encodeABI()
        //     }
        //
        //     let signed = await web3.eth.accounts.signTransaction(txObject, privateKey)
        //
        //     let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
        //         .on('error', (err) => {
        //             console.log(err)
        //         }).on('transactionHash', (hash) => {
        //             console.log(hash)
        //         }).on('confirmation', (confirmationNumber, receipt) => {
        //             if (confirmationNumber === 1) {
        //                 console.log(receipt)
        //             }
        //         })
        //     expect(tx.status).to.equal(true)
        //     // 14284209926228481
        // });

   });

    // describe('Withdraw', function () {
    //     it('Should work perfectly', async function () {
    //         contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
    //         let count = await web3.eth.getTransactionCount(publicKey, "pending")
    //
    //         let txObject = {
    //             from: publicKey,
    //             to: portalAddress,
    //             gasPrice: 25 * 1000000000,
    //             gasLimit: 1000000,
    //             chainId: 4,
    //             nonce: web3.utils.toHex(count),
    //             data: contract.methods.withdrawXIO('1000000000000000000').encodeABI()
    //         }
    //
    //         let signed = await web3.eth.accounts.signTransaction(txObject, privateKey)
    //
    //         let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
    //             .on('error', (err) => {
    //                 console.log(err)
    //             }).on('transactionHash', (hash) => {
    //                 console.log(hash)
    //             }).on('confirmation', (confirmationNumber, receipt) => {
    //                 if (confirmationNumber === 1) {
    //                     console.log(receipt)
    //                 }
    //             })
    //         expect(tx.status).to.equal(true)
    //         // 14284209926228481
    //     });
    //
    //
    //     it('Should not work because amount is 0', async function () {
    //         contract = new web3.eth.Contract(contants.ABI_PORTAL, portalAddress);
    //         let count = await web3.eth.getTransactionCount(publicKey, "pending")
    //
    //         let txObject = {
    //             from: publicKey,
    //             to: portalAddress,
    //             gasPrice: 25 * 1000000000,
    //             gasLimit: 1000000,
    //             chainId: 4,
    //             nonce: web3.utils.toHex(count),
    //             data: contract.methods.withdrawXIO('0').encodeABI()
    //         }
    //
    //         let signed = await web3.eth.accounts.signTransaction(txObject, privateKey)
    //
    //         let tx = await web3.eth.sendSignedTransaction(signed.rawTransaction)
    //             .on('error', (err) => {
    //                 console.log(err)
    //             }).on('transactionHash', (hash) => {
    //                 console.log(hash)
    //             }).on('confirmation', (confirmationNumber, receipt) => {
    //                 if (confirmationNumber === 1) {
    //                     console.log(receipt)
    //                 }
    //             })
    //         expect(tx.status).to.equal(true)
    //         // 14284209926228481
    //     });
    //
    // });


});



