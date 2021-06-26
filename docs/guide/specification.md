---
title: Specification
---

# Specification

ObjectAPI is an interface specification to describe the boundaries of your software modules in an object format.

ObjectAPI sees the world as a set of interface modules, which together form an interface layer. Each module is encapsulated in one ObjectAPI document.

The specification describes the details how to write such a ObjectAPI document.

Version 0.1.0
The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

The ObjectAPI Specification is copyrighted by ApiGear UG, all rights reserved.

## Introduction

The ObjectAPI specification is a project used to describe and document object oriented APIs across languages and technologies.

The ObjectAPI specification defines a set of files required to describe such an API. These files can then be used to create utilities, such as documentation, integration and/or testing tools.

The ObjectAPI Specification is often used to describe the interface between software modules or inter-process communication (IPC) in distributed systems built using a object oriented programming API. The ObjectAPI recommends to split APIs into smaller modules with loose coupling.

The documents describe an API module and its interfaces and data structures.

### Revision History
* Version 0.1
  * Initial ObjectAPI specification

### Definitions

* A system: A system is a collection of modules, which describe a coherent set of APIs on the same layer.
* A module: A module describes a name spaced collection of API symbols, such as interfaces, structures, enumerations. There exists one module per file.
* An interface is a named interface description of an object with properties, operations and signals.
* A structure is a data type with fields describing the structure
* A enumeration is a enumerated integer or string value


## Basics

InterfaceAPI is defined in terms of modules inside a layer. Each module is captured inside a InterfaceAPI module document. InterfaceAPI is a YAML based specification with a linked schema document for validation.

### Format

The files describing the InterfaceAPI in accordance to APIGear InterfaceAPI specification are described in JSON syntax and must conform to the JSON standard.

While the the API is described in JSON, other formats (YAML) can be used as input formats.

Unless otherwise noted all file names in this specification are case sensitive.

### File Structure

There exists a set of files where each file represents an API module. Ideally, the file name matches the module name. Other files can be added which contain meta information for the API modules. They allow to inject additional information which is not relevant or available during API definitions.

- `*.module.yaml` | `*.module.json` - InterfaceAPI document
- `*.module.meta.yaml` | `*.module.meta.json` - InterfaceAPI meta information injected into the relevant APIs.

So if a module is name `org.example` the InterfaceAPI document should be called `org.example.module.yaml`

### Data Types

In the InterfaceAPI specification data types are used in many locations. State, Method return types and parameters, signal parameters or structures.

Data fields are added at the same level to describe the data name and type. For example for the interface properties, these are:

```yaml
properties:
  - name: count
    type: int
```

The general types available to InterfaceAPI are:

- Primitives (`bool`, `int`, `float`, `string`)
- Containers (`arrays`)
- Complex (`structures`, `enumerations`)

### Primitives

Data types can be re-presented in different forms in different programming languages. They all need to be convertible to JSON data types on request.

- `bool`
- `int`
- `float`
- `string`

### Arrays

An array is an index based list of primitive or complex data types. Further nesting of containers are not supported but can be achieved using structs as array items. A data type is converted into a container by setting the type to array and specifying the containing type in the items key.

For example an integer array can be noted like this:

```yaml
properties:
  - name: names
    type: array
    items: string
```

If an array does contain a symbol as containing type, then the symbol name can be used in the items key.

```yaml
properties:
  - name: messages
    type: array
    items: { ref: Message }
```

Primitive types are always lowercase and symbols are always uppercase. The cases might change in the target language.

### Complex Types

A symbol is a named element inside a module. This can be either an interface, struct or enum/flag symbol.

```yaml
structs:
  - name: Message
```

Inside the same module the type can be referenced by the name of the symbol using a `ref`. This holds true for all symbols.

```yaml
properties:
  - name: msg1
    type: { ref: Message }
  - name: msg2
    type: array
    items: struct
    symbol: { ref: Message }
```

Outside the module, the module itself needs to be imported and the type needs to be used with its fully qualified name

```yaml
imports:
  - org.example

interfaces:
  - name: Interface1
    properties:
      - name: msg1
        type: { ref: org.example.Message }
```

- `org.example.Message` - external symbol

Note: Not every language profile does support importing.

### Rich Text Formatting

Throughout the specification `description` support the markdown syntax.

## API Modules
### Module Namespaces

A module is a namespace for InterfaceAPI symbols like interfaces, structures and enumerations. The module bundles these symbols together in one namespace.

A module is identified by its `name` and `version`. The module name should be typically lowercase and words separated by `.`, like a reverse URI notation `org.example`.

A module can have an additional `info` block to describe in more detailed the module information.

Typically a module consist of the `apigear.interfaces` version declaration, the module name and version, the list of interfaces, structures and signals.

The version number must be written as a string, otherwise it wil be converted to a numeric value (e.g. 1 for 1.0).

Only interfaceapi, name, version are mandatory. The other identifiers are optional.

```yml
schema: apigear.module/1.0
name: org.example
version: "1.0"
interfaces:
structs:
enums:
```

### Interfaces

An interface is the main instance to describe your software boundary using interface terms. The interface consist of state, operation and signals. The state is typically describe a a set of properties of the interface and operations modify the interface state. Signals notify the user of changes of the interface.

The interface itself is identified by its `name` inside a module.

```yml
schema: apigear.module/1.0
name: "org.example"
version: "1.0"

interfaces:
  - name: MyInterface
```

#### Object state

Each property has a `name` and a `type` as also `description` and additional `meta` data.

```yml
# ...
interfaces:
  - name: MyInterface
    properties:
      - name: value
        type: int
```

#### Operation

A operation defines the interaction with the interface. It is a collection of operations which can either manipulate the properties or return data.

Ideally you design your operations in a way that they can be divided into commands and queries. A command is an operation which does something on the interface and a query collects data from the interface and returns it to the user.

```yml
# ...
interfaces:
  - name: MyInterface
    operations:
      - name: command
        description: A command does not have a return type
      - name: query
        type: string
        description: A query returns data
```

Operation can have parameter arguments

```yml
# ...
interfaces:
  - name: MyInterface
    operations:
      - name: command
        params:
          - name: step
            type: int
```

The arguments do parameterize the operation.

#### Signals

A signal allows the interface to notify the outside world about events happening, e.g. triggered by others. A signal is like an operation, but never defines a type.

```yml
# ...
interfaces:
  - name: MyInterface
    signals:
      - name: error
        params:
          - name: code
            type: int
```

### Data Structures

A structure represents a data structure which can be used for communication. The structure consist of a `name` and a set of data fields. Each field again has a `name` and a `type` information.

```yml
# ...
types:
  - name: Message
    fields:
      - name: msg
        type: string
```

A data structure does not contain any operations or signals. A data structure is typically used as a type for properties, operation parameters and others.

```yml
# ...
interfaces:
  - name: MessageSender
    properties:
      - name: lastMessage
        type: { ref: Message }
    operations:
      - name: send
        params:
          - name: msg
            type: { ref: Message }
```

Data structure can be identified just be identified its name.

Data structures can be nested by using the type name of the nested type. In some programming languages care needs to be taken by the order of declaration.

### Enumerations

Enumerations and Flags are value types, which allow a user to use a defined number of choices to identify a value.

```yml
enums:
  - name: Status
    members:
      - name: None
        value: 0
      - name: Loading
        value: 1
      - name: Ready
        value: 2
      - name: Error
        value: 3
```

The values are optional and when missing the value is counted incrementally from 0 on upwards.

```yml
enums:
  - name: Status
    members:
      - name: None
      - name: Loading
      - name: Ready
      - name: Error
```

An enumeration is also a symbol and can be used by its name to identify its type.

```yml
# ...
interfaces:
  - name: MyInterface
    properties:
      - name: status
        type: { ref: Status } # references the Status enumeration
```

## Advanced

A temperature sensor tutorial using ApiGear and Raspberry Pi


### Document information

The info section allows user to add information related to the current document.

```yaml
info:
  license: <license-identifier>
```

### Meta information

Sometimes it is required to add additional information, which is not part of the InterfaceAPI specification. For this the meta tag can be used.

```yaml
interfaces:
  - name: Tuner
    meta:
      singleton: true
      config: { port: 1024 }
```

As the information is not part of the specification the applied code generator must have an understanding of the data. For example a C++ code generator could create a singleton type from the interface declaration.

### Compact Writing
 YAML allows a compact format for single line information. This allows us to shorten API definitions considerable. For example this API
```yaml
structs:
  - name: Error
    fields:
      - name: message, 
        type: string
      - name: code
        type: int
```

Can be written in a short format like this:

```yaml
structs:
  - name: Error
    fields:
      - { name: message, type: string }
      - { name: code, type: int }
```
