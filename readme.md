# owl-invoice

## Install
1.
```sh
npm install owl-invoice -g
```
2. install [wkhtmltopdf](https://wkhtmltopdf.org/downloads.html) and add it to PATH

## Configuration
- create `.owlinvoicerc` in the user`s home directory
```json
{
    "PORT" : 8801,
    "DIR": "path where should be database stored",
}
```

## Usage
```sh
owlinvoice
```
### Git database
If the database directory specified in `DIR` contains a initialized git repository, then owl-invoice will automatically pull and push each change to a current branch. It is necessary to have remote upstream branch for current local branch already specified. In other words, `git pull` and `git push` commands must end with success without specifying remote or branch. Only files in `db` subdirectory are pushed to remote repository. Also keep in mind, that owl-invoice will not try to do any merging by itself.

## development
### setup
1. setup `.env` file according to `.env.example`
2. `npm i && cd client && npm i && cd ..`
3. setup `proxy` in `client\src\setupProxy.js` (TODO: make it configurable)
### start
1. `npm start`