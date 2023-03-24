import { utils, Wallet } from "zksync-web3";import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
export default async function (hre: HardhatRuntimeEnvironment) {
console.log(`Running deploy script for the Greeter contract`);
const wallet = new Wallet("WALLET PRIVATE KEY");
let deployer
let artifact
try {
deployer = new Deployer(hre, wallet);  artifact = await deployer.loadArtifact("Greeter");
}catch (error){console.error("error in deployer and artifact",error)}
const depositAmount = ethers.utils.parseEther("0.01");
let depositHandle
try {
depositHandle = await deployer.zkWallet.deposit({
to: deployer.zkWallet.address,token: utils.ETH_ADDRESS,amount: depositAmount,});
await depositHandle.wait();
}catch (error){console.error("error in deposit handle",error)}
const greeting = "Hi there!";const greeterContract = await deployer.deploy(artifact, [greeting]);
const contractAddress = greeterContract.address;console.log(artifact.contractName+" was deployed to "+ contractAddress);
const greetingFromContract = await greeterContract.greet();if (greetingFromContract == greeting) {
console.log("Contract greets us with"+ Greeting);} else {
console.error("Contract said something unexpected:"+ GreetingFromContract);}
const newGreeting = "Hey guys";const setNewGreetingHandle = await greeterContract.setGreeting(newGreeting);
await setNewGreetingHandle.wait();
const newGreetingFromContract = await greeterContract.greet();
if (newGreetingFromContract == newGreeting) {console.log("Contract greets us with"+ newGreeting);} else
{console.error("Contract said something unexpected:"+ newGreetingFromContract);}}
