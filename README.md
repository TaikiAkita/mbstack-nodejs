﻿## XiaoJSoft Modbus Stack for Node.JS

### Overview

This Node.JS package provides a comprehensive Modbus master/slave framework.

### Installation and Usage

#### From NPM (currently unavailable)

To install this package:

```
npm install mbstack --save
```

And then you can import this package in your JavaScript source file:

```
const MBStack = require("mbstack");
```

#### From Local Directory

Or you can clone this repository in a subdirectory of your project:

```
git clone https://github.com/TaikiAkita/mbstack-nodejs mbstack
```

And then install the dependencies:

```
cd mbstack
npm ci --production
cd ..
```

Now you can import this package by refering to this directory:

```
const MBStack = require("./mbstack");
```

### Requirements

 - Node.JS (v10.7.0 or later)

### Documents

Documents are still under construction. Currently, only following documents are provided:

 - [Usage Guide](https://github.com/TaikiAkita/mbstack-nodejs/blob/master/docs/usage.md)
 - Transport-Layer Subsystem Configuration Guide ([TCP](https://github.com/TaikiAkita/mbstack-nodejs/blob/master/docs/transport-layer/tcp-configguide.md), [RTU](https://github.com/TaikiAkita/mbstack-nodejs/blob/master/docs/transport-layer/rtu-configguide.md), [ASCII](https://github.com/TaikiAkita/mbstack-nodejs/blob/master/docs/transport-layer/ascii-configguide.md))

### Examples

We provided several examples under [examples/](https://github.com/TaikiAkita/mbstack-nodejs/tree/master/examples) directory.

### Project Status

This project is still in alpha stage, which means that it would be relatively unstable.

