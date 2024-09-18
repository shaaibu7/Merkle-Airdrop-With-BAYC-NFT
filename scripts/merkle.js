const fs = require('fs');
const csv = require('csv-parser');
const { keccak256 } = require('ethers');
const { MerkleTree } = require('merkletreejs');
const { ethers } = require('ethers');



const computeHash = async (filePath) => {
    let result  = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            const address = row['address'];
            const amount = row['amount'];
            
            const hash = ethers.solidityPackedKeccak256(["address", "uint256"],[address,amount]);

            result.push(hash);
        })
        .on('end', () => {
            resolve(result);
        
        })
    })  
}


let data = async () => {
    try {
        const result = await computeHash('./userData/users.csv');
        
        // Write hashed data of addresses and amount to json file
        let data = result.join('\n');
        fs.writeFile('userHash.json', data, (err) => {
            if(err) {
                console.log(err)
            }
        })
        
        const levaes = result.map(item => (item));
        const tree = new MerkleTree(levaes, keccak256, { sort: true });
        const root = tree.getHexRoot();
        

        const leaf = result[0];
        const proof = tree.getHexProof(leaf);

        console.log(tree.verify(proof, leaf, root)); 
        console.log(`This is the merkle root, ${root}`);
        console.log(`this is the merkle proof ${proof}`)

    } catch (error) {
        console.log(error);
    }
};


console.log(data());