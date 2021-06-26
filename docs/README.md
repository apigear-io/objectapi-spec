---
home: true
heroText: Building the future of API driven architecture.
tagline: Open source tools to easily build and maintain your API driven architecture. All powered by the ObjectAPI specification.
actionText: Get Started →
actionLink: /guide/intro
features:
- title: Machine/human Readable Specification
  details: YAML based specification allows for easy integration and writing of API definitions 
- title: Generate anything!
  details: Generate docs, code, anything with our tools. Don't see your solution here? Create your own custom templates or extend existing ones.
- title: Objects on Steroids!
  details: ObjectAPI provide support for synced properties, rpc calls as also server events, all in in one format.

features2: # Studio
- title: Create APIs and Solutions
  details: Create your own API or import an existing API. Combine several APIs and technologies to larger solutions.
- title: Dynamic Templates
  details: A collection of reference templates can be installed and extended. Or create and import your own.
- title: Batteries included!
  details: Studio allows you to simulate your APIs to ensure you don't have to wait for the backend engineers.

features3: # ObjectLink
- title: Property synchronization
  details: Properties are synced across linked objects
- title: Asynchronous remote invocations
  details: Invoke method remotely on objects
- title: Server side signals
  details: Notify all linked objects about changes on server side
- title: Core Protocols
  details: Tested core protocols, with examples in HTTP and Websockets
- title: Code Generation
  details: Complete code generation support by ApiGear.
- title: Different Languages
  details: Available in C++14, Typescript and Python. More to come...

footer: MIT Licensed | Copyright © 2021-present ApiGear UG
---

# [ObjectAPI Specification](/guide/specification.html)

<code-group>
<code-block title="ObjectAPI">
```yaml
schema: objectapi.modules/1.0
interfaces:
  - name: Counter
    properties:
      - name: count
        type: int
    operations:
      - name: increment
      - name: decrement
```
</code-block>

<code-block title="C++">
```cpp
class Counter {
public:
    virtual ~Counter();

    int count() const = 0;
    void setCount(int count) = 0;

    void increment() = 0;
    void decrement() = 0;
};
```
</code-block>

<code-block title="Python">
```py
class Counter {
    def __init__(self):
        self.count = 0

    def increment():
        raise NotImplementedError()

    def decrement():
        raise NotImplementedError()
```
</code-block>


<code-block title="TypeScript">
```ts
interface Counter {
    count: int

    increment(): void
    decrement(): void

}
```
</code-block>

<code-block title="Go">
```go
interface Counter {
    count() int
    setCount(v int)

    increment() error
    decrement() error
}
```
</code-block>

<code-block title="Qt5">
```cpp
class AbstractCounter extend QObject {
    Q_PROPERTY(int count READ count WRITE setCount NOTIFY countChanged)
public:
    virtual ~Counter(QObject* parent);

    int count() const = 0;
    void setCount(int count) = 0;

    void increment() = 0;
    void decrement() = 0;
signals:
    void countChanged(int count);
};
```
</code-block>


</code-group>

# [ApiGear Studio](https://apigear.io)

<div class="hero">
  <p class="description">The one stop shop to manage your ObjectAPIs</p>
</div>

![ApiGear Studio](./images/studio1.png)

<template>
  <div v-if="$frontmatter.features2 && $frontmatter.features2.length" class="features">
    <div v-for="(feature, index) in $frontmatter.features2" :key="index" class="feature">
      <h2>{{ feature.title }}</h2>
      <p>{{ feature.details }}</p>
    </div>
  </div>
</template>

# [ObjectLink Protocol](https://objectlinkprotocol.net)

<div class="hero">
  <p class="description">Link Objects over WebSockets</p>
  <img src="./images/ObjectLinkProtocol.png" alt="objectlink protocol"/>
</div>

<template>
  <div v-if="$frontmatter.features3 && $frontmatter.features3.length" class="features">
    <div v-for="(feature, index) in $frontmatter.features3" :key="index" class="feature">
      <h2>{{ feature.title }}</h2>
      <p>{{ feature.details }}</p>
    </div>
  </div>
</template>




