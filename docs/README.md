---
home: true
heroText: Building the future of API driven architecture.
tagline: Open source tools to easily build and maintain your API driven architecture. All powered by the ObjectAPI specification.
actionText: Get Started →
actionLink: /guide/intro
features:
- title: Machine Readable Definitions
  details: Minimal setup with markdown-centered project structure helps you focus on writing.
- title: Generate anything!
  details: Generate docs, code, anything with our tools. Don't see your solution here? Create your own custom templates or extend existing ones.
- title: Objects on Steroids!
  details: VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
footer: MIT Licensed | Copyright © 2021-present ApiGear UG
---

# ObjectAPI

<template>
    <SimpleNewsletter/>
</template>

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


</code-group>


