# owl-invoice

## Install
```sh
npm install owl-invoice -g
```

## Configuration
- create `.owlinvoicerc` in the user`s home directory
```json
{
    "PORT" : 8801,
    "DIR": "path where should be database stored"
}
```

## Usage
```sh
owlinvoice
```

## development
### setup
1. setup `.env` file according to `.env.example`
2. `npm i && cd client && npm i && cd ..`
3. setup `proxy` in `client\src\setupProxy.js` (TODO: make it configurable)
### start
1. `npm start`