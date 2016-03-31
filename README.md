#### An example using nodejs + express + mongodb

![nodejs + express + mongodb](https://cloud.githubusercontent.com/assets/5398914/14170343/279abb22-f768-11e5-9058-d35492b39709.jpg)

### The directory structure of the project
```
.
├── README.md
├── app.js
├── bin
│   └── www
├── models
│   └── Post.js
├── package.json
├── public
│   └── stylesheets
│       └── style.css
├── routes
│   └── index.js
└── views
    ├── common
    │   ├── footer.ejs
    │   └── header.ejs
    ├── edit.ejs
    ├── index.ejs
    └── new.ejs

7 directories, 12 files
```

#### Install mongodb
```
$ sudo vi /etc/yum.repos.d/10gen.repo
```
Contents of `10gen.repo` following:
```
[10gen]
name=10gen Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64
gpgcheck=0
enabled=1
```

Install mongodb using `yum`:
```
$ sudo yum install -y mongo-10gen mongo-10gen-server
```

Start mongodb:
```
$ sudo service mongod start
$ sudo chkconfig mongod on
```

#### Install the packages needed by `npm`
```
$ cd flux-react-example
$ npm install
```

#### Start nodejs
```
$ npm start
```

To run the app, spin up an HTTP server and visit `http://localhost:3000/`
