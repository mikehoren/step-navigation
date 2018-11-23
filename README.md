Summary
-------

This is prototype code attempting to create an abstraction to better manage navigational flows for UI features such as tours or step-by-step content.

Usage
-----

The input for the create() method expects an array of steps with subarrays when you wish to fork the paths into two or more different paths. Below are examples input arrays.

```javascript
const STEP1 = 'a'
const STEP2 = 'b'
const STEP3 = 'c'
const STEP4 = 'd'
const STEP5 = 'e'
const STEP6 = 'f'
const STEP7 = 'g'
const STEP8 = 'h'
const STEP9 = 'i'
const STEP10 = 'j'

// single flow
const x = [STEP1, STEP2, STEP3, STEP4, STEP5, STEP6, STEP7]

// fork flow into two after STEP3
const y = [STEP1, STEP2, STEP3, [
  [STEP4, STEP5, STEP6],
  [STEP7, STEP8, STEP9],
]]

// fork flow after STEP3 then merge back to single flow at STEP8
const z = [STEP1, STEP2, STEP3, [
  [STEP4, STEP5],
  [STEP6, STEP7]
], STEP8, STEP9, STEP10]

// paths can also be created using objects, the two allowable properties are "name" and "data", "name" is required in this format.
const d = [
  { name: STEP1, data: { value: 1 } }, 
  { name: STEP2, data: { value: 2 } }, 
  { name: STEP3, data: { value: 3 } }, 
  { name: STEP4, data: { value: 4 } }
]

```

Then call create with the input

```javascript
import { create } from './src'

const path = create(x)
```

The result is a path object you can use to aid in navigation through your UI flow. An example using react can be found here: https://github.com/mikehoren/step-navigation/blob/master/examples/example.jsx

Path Attributes
---------------

#### path.isFirst

Is true on the root step (first step) of your flow, undefined on all others.

#### path.isLast

Is true on the last step of the path or the last step of each fork of a path.

#### path.name

The step name as defined by the input array for any given step.

#### path.data

If the data property was specified it can be accessed using this property.

Path Methods
------------

#### path.next(value)

Returns the next step in the path. Value is optional, for linear paths it always returns the next step.  If value is omitted for forked paths it returns the first defined fork, otherwise value should match the next step in a fork to choose which path to follow. Calling next() on the last step will always return the last step.

Forked path example

```javascript
const def = [STEP1, STEP2, STEP3, [
  [STEP4, STEP5, STEP6],
  [STEP7, STEP8, STEP9],
]]

const path = create(def)
let step = path
step = step.next().next()
step = step.next(STEP7) //forks to second path
```

#### path.back()

Returns the previous step the user was on. Calling back on the first step always returns the first step.

#### path.first()

Returns to the first step irregardless of which step you're currently on. Useful for resets.

#### path.matches(step)

Returns true or false whether the passed in step matches the current step you're on.  Useful for determining when to show what.

#### path.goTo(step)

Returns the first step matching the input step name within the path. If no step is found it returns the root step. If multiple steps with the same name are found it returns the first matching one. Useful for jumping from one step to another.
