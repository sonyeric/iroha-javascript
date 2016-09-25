# いろはjs(irohajs)  

## What's is いろは(iroha)?  
いろは(iroha) is [this](https://github.com/soramitsu/iroha).

## Description  
いろはjs(irohajs) is client javascript library for using いろは(iroha).
[demo]()

## Requirement  
* [js-sha3](https://github.com/emn178/js-sha3)
* [supercop.js(GUCCI-swallow)](https://github.com/GUCCI-swallow/supercop.js)

## Installation  
*  Clone this repository.
*  [Download the latest reelase]().
*  [Feature]Install with npm/bower.

## Usage
### Load

```html
<script src="/path/to/iroha.js"></script>
```

### API
#### iroha.createKeyPair

```js
var keys = iroha.createKeyPair();
```

#### iroha.registAccount

```js
var res = iroha.registAccount({
				accessPoint: ip address or url,
				name: account name,
				publicKey: public key(base64)
			});
```

#### iroha.getAccountInfo

```js
var res = iroha.getAccountInfo({
				accessPoint: ip address or url,
 				uuid: uuid(sha3)
			});
```
#### iroha.registDomain

```js
var res = iroha.registDomain({
				accessPoint: ip address or url,
 				domainName: domain name,
 				ownerPublicKey: owner public key(base64),
 				ownerPrivateKey: owner private Key(base64)
			});
```

#### iroha.getDomainList

```js
var res = iroha.getDomainList(uuid(sha3));
```

#### iroha.createAsset

```js
var res = iroha.createAsset({
 				accessPoint: ip address or url,
 				assetName: asset name,
 				domainName: domain name,
				creatorPublicKey: creator public key(base64),
 				creatorPrivateKey: creator private key(base64)
			});
```

#### iroha.operateAsset

```js
var res = iroha.operateAsset({
				accessPoint: ip address or url,
 				assetUuid: asset uuid(sha3),
 				command: operation command,
 				amount: amount,
 				senderPublicKey: sender public key(base64),
 				senderPrivateKey: sender private key(base64),
 				receiverPublicKey: receiver public key(base64)
			});
```

#### iroha.getAssetList

```js
var res = iroha.getAssetList({
				 accessPoint: ip address or url,
 				 domainName: domain name
			});
```

#### iroha.getAssetList

```js
var res = iroha.getAssetList({
 				accessPoint: ip address or url,
 				domainName: domain name
			});
```

#### iroha.getAssetTransaction

```js
var res = iroha.getAssetTransaction({
 				accessPoint: ip address or url,
 				domainName: domain name,
 				assetName: asset name
			});
```

#### iroha.getUserTransaction

```js
var res = iroha.getUserTransaction({
				accessPoint: ip address or url,
 				uuid: user uuid(sha3)
			});
```

## Author  
[GUCCI-swallow](https://github.com/GUCCI-swallow)

## License
