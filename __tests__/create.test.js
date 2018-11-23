import {
  create,
} from '../src'
import {
  convertList,
} from '../src/convertList'

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

const x = [STEP1, STEP2, STEP3, STEP4, STEP5, STEP6, STEP7]
const y = [STEP1, STEP2, STEP3, [
  [STEP4, STEP5, STEP6],
  [STEP7, STEP8, STEP9],
]]

const z = [STEP1, STEP2, STEP3, [
  [STEP4, STEP5],
  [STEP6, STEP7]
], STEP8, STEP9, STEP10]

const d = [
  { name: STEP1, data: { value: 1 } }, 
  { name: STEP2, data: { value: 2 } }, 
  { name: STEP3, data: { value: 3 } }, 
  { name: STEP4, data: { value: 4 } }
]

describe('create()', () => {
  
  describe('empty path', () => {

    it('should return a single path for undefined', () => {
      const path = create()
      expect(path.isFirst).toEqual(true)
      expect(path.name).toEqual('step1')
    })

    it('should return a single path for an empty array', () => {
      const path = create([])
      expect(path.isFirst).toEqual(true)
      expect(path.name).toEqual('step1')
    })

  })

  describe('Single path', () => {

    let path = null

    beforeEach(() => {
      path = create(x, {})
    })

    describe('isFirst', () => {
      it('should be true for the first step', () => {
        let p = path
        expect(p.isFirst).toEqual(true)
        p = p.next()
        expect(p.isFirst).toEqual(undefined)
        p = p.next()
        expect(p.isFirst).toEqual(undefined)
        p = p.next()
        expect(p.isFirst).toEqual(undefined)
        p = p.next()
        expect(p.isFirst).toEqual(undefined)
        p = p.next()
        expect(p.isFirst).toEqual(undefined)
        p = p.next()
        expect(p.isFirst).toEqual(undefined)
      })
    })

    describe('next()', () => {
      it('should transition forward through the path', () => {
        let p = path
        expect(p.matches(STEP1)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP2)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP3)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP4)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP5)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP6)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP7)).toEqual(true)
        p = p.next().next().next().next()
        expect(p.matches(STEP7)).toEqual(true)
      })  
    })

    describe('back()', () => {
      it('should transition backward through the path', () => {
        let p = path
        p = p.next().next().next().next().next().next()
        expect(p.matches(STEP7)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP6)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP5)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP4)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP3)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP2)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP1)).toEqual(true)
        p = p.back().back().back().back().back()
        expect(p.matches(STEP1)).toEqual(true)
      })
    })

    describe('first()', () => {
      it('should jump to the first step', () => {
        let p = path
        p = p.next().next().next().next().next().next()
        expect(p.matches(STEP7)).toEqual(true)
        p = p.first()
        expect(p.matches(STEP1)).toEqual(true)
      })
    })

    describe('matches', () => {
      it('should match the current step', () => {
        let p = path
        expect(p.matches(STEP1)).toEqual(true)
        expect(p.matches(STEP2)).toEqual(false)
        p = p.next().next()
        expect(p.matches(STEP3)).toEqual(true)
        expect(p.matches(STEP2)).toEqual(false)
        expect(p.matches(STEP4)).toEqual(false)
      })
    })

    describe('goTo', () => {
      it('should jump forward', () => {
        let p = path
        expect(p.matches(STEP1)).toEqual(true)
        p = path.goTo(STEP4)
        expect(p.matches(STEP4)).toEqual(true)
      })
      it('should jump backwards', () => {
        let p = path
        expect(p.matches(STEP1)).toEqual(true)
        p = p.next().next().next().next()
        expect(p.matches(STEP5)).toEqual(true)
        p = p.goTo(STEP2)
        expect(p.matches(STEP2)).toEqual(true)
      })
    })

    describe('isLast', () => {
      it('should be true for the last step', () => {
        let p = path
        p = p.next().next().next().next().next().next()
        expect(p.isLast).toEqual(true)
        expect(p.matches(STEP7)).toEqual(true)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
      })
    })

  })

  describe('Split path', () => {

    let path = null

    beforeEach(() => {
      path = create(y, {})
    })

    describe('isFirst', () => {
      it('should be true for the first step', () => {
        let p = path
        expect(p.isFirst).toEqual(true)
        p = p.next()
        expect(p.isFirst).toEqual(undefined)
        p = p.next()
        expect(p.isFirst).toEqual(undefined)
        p = p.next()
        expect(p.isFirst).toEqual(undefined)
        p = p.next()
        expect(p.isFirst).toEqual(undefined)
        p = p.next()
        expect(p.isFirst).toEqual(undefined)
      })
    })

    describe('next()', () => {
      it('should transition forward through the path default first path', () => {
        let p = path
        expect(p.matches(STEP1)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP2)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP3)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP4)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP5)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP6)).toEqual(true)
        p = p.next().next().next().next()
        expect(p.matches(STEP6)).toEqual(true)
      })

      it('should transition forward through the path specified at fork', () => {
        let p = path
        expect(p.matches(STEP1)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP2)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP3)).toEqual(true)
        p = p.next(STEP7)
        expect(p.matches(STEP7)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP8)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP9)).toEqual(true)
        p = p.next().next().next().next()
        expect(p.matches(STEP9)).toEqual(true)
      })  
    })

    describe('back()', () => {
      it('should transition backward through the path', () => {
        let p = path
        p = p.next().next().next().next().next()
        expect(p.matches(STEP6)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP5)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP4)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP3)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP2)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP1)).toEqual(true)
        p = p.back().back().back().back().back()
        expect(p.matches(STEP1)).toEqual(true)
      })
    })

    describe('first()', () => {
      it('should jump to the first step', () => {
        let p = path
        p = p.next().next().next().next().next()
        expect(p.matches(STEP6)).toEqual(true)
        p = p.first()
        expect(p.matches(STEP1)).toEqual(true)
        p = p.next().next().next(STEP7).next().next()
        expect(p.matches(STEP9)).toEqual(true)
        p = p.first()
        expect(p.matches(STEP1)).toEqual(true)
      })
    })

    describe('goTo', () => {
      it('should jump forward on fork 1', () => {
        let p = path
        expect(p.matches(STEP1)).toEqual(true)
        p = path.goTo(STEP6)
        expect(p.matches(STEP6)).toEqual(true)
      })
      it('should jump forward on fork 2', () => {
        let p = path
        expect(p.matches(STEP1)).toEqual(true)
        p = path.goTo(STEP9)
        expect(p.matches(STEP9)).toEqual(true)
      })
      it('should jump backwards on fork 1', () => {
        let p = path
        expect(p.matches(STEP1)).toEqual(true)
        p = p.next().next().next(STEP4).next().next()
        expect(p.matches(STEP6)).toEqual(true)
        p = p.goTo(STEP2)
        expect(p.matches(STEP2)).toEqual(true)
      })
      it('should jump backwards on fork 2', () => {
        let p = path
        expect(p.matches(STEP1)).toEqual(true)
        p = p.next().next().next(STEP7).next().next()
        expect(p.matches(STEP9)).toEqual(true)
        p = p.goTo(STEP3)
        expect(p.matches(STEP3)).toEqual(true)
      })
    })

    describe('isLast', () => {
      it('should be true for the last step of fork 1', () => {
        let p = path
        p = p.next().next().next(STEP4).next().next()
        expect(p.isLast).toEqual(true)
        expect(p.matches(STEP6)).toEqual(true)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
      })
      it('should be true for the last step of fork 2', () => {
        let p = path
        p = p.next().next().next(STEP7).next().next()
        expect(p.isLast).toEqual(true)
        expect(p.matches(STEP9)).toEqual(true)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
      })
    })

  })

  describe('Bridge path', () => {

    let path = null

    beforeEach(() => {
      path = create(z, {})
    })

    describe('isFirst', () => {
      it('should be true for the first step', () => {
        let p = path
        expect(p.isFirst).toEqual(true)
        p = p.next()
        expect(p.isFirst).toEqual(undefined)
        p = p.next()
        expect(p.isFirst).toEqual(undefined)
        p = p.next()
        expect(p.isFirst).toEqual(undefined)
        p = p.next()
        expect(p.isFirst).toEqual(undefined)
        p = p.next()
        expect(p.isFirst).toEqual(undefined)
      })
    })

    describe('next()', () => {
      it('should transition forward through the path default first path', () => {
        let p = path
        expect(p.matches(STEP1)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP2)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP3)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP4)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP5)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP8)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP9)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP10)).toEqual(true)
        p = p.next().next().next().next()
        expect(p.matches(STEP10)).toEqual(true)
      })

      it('should transition forward through the path specified at fork', () => {
        let p = path
        expect(p.matches(STEP1)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP2)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP3)).toEqual(true)
        p = p.next(STEP6)
        expect(p.matches(STEP6)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP7)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP8)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP9)).toEqual(true)
        p = p.next()
        expect(p.matches(STEP10)).toEqual(true)
        p = p.next().next().next().next()
        expect(p.matches(STEP10)).toEqual(true)
      })  
    })

    describe('back()', () => {
      it('should transition backward through the path', () => {
        let p = path
        p = p.next().next().next().next().next().next().next().next()
        expect(p.matches(STEP10)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP9)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP8)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP5)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP4)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP3)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP2)).toEqual(true)
        p = p.back()
        expect(p.matches(STEP1)).toEqual(true)
        p = p.back().back().back().back().back()
        expect(p.matches(STEP1)).toEqual(true)
      })
    })

    describe('first()', () => {
      it('should jump to the first step', () => {
        let p = path
        p = p.next().next().next().next().next().next().next().next()
        expect(p.matches(STEP10)).toEqual(true)
        p = p.first()
        expect(p.matches(STEP1)).toEqual(true)
        p = p.next().next().next(STEP6).next().next().next().next().next()
        expect(p.matches(STEP10)).toEqual(true)
        p = p.first()
        expect(p.matches(STEP1)).toEqual(true)
      })
    })

    describe('goTo', () => {
      it('should jump forward on fork 1', () => {
        let p = path
        expect(p.matches(STEP1)).toEqual(true)
        p = path.goTo(STEP5)
        expect(p.matches(STEP5)).toEqual(true)
      })
      it('should jump forward on fork 2', () => {
        let p = path
        expect(p.matches(STEP1)).toEqual(true)
        p = path.goTo(STEP7)
        expect(p.matches(STEP7)).toEqual(true)
      })
      it('should jump backwards on fork 1', () => {
        let p = path
        expect(p.matches(STEP1)).toEqual(true)
        p = p.next().next().next(STEP4).next().next().next().next()
        expect(p.matches(STEP10)).toEqual(true)
        p = p.goTo(STEP4)
        expect(p.matches(STEP4)).toEqual(true)
      })
      it('should jump backwards on fork 2', () => {
        let p = path
        expect(p.matches(STEP1)).toEqual(true)
        p = p.next().next().next(STEP6).next().next().next().next()
        expect(p.matches(STEP10)).toEqual(true)
        p = p.goTo(STEP6)
        expect(p.matches(STEP6)).toEqual(true)
      })
    })

    describe('isLast', () => {
      it('should be true for the last step of fork 1', () => {
        let p = path
        p = p.next().next().next(STEP4).next().next().next().next()
        expect(p.isLast).toEqual(true)
        expect(p.matches(STEP10)).toEqual(true)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
      })
      it('should be true for the last step of fork 2', () => {
        let p = path
        p = p.next().next().next(STEP6).next().next().next().next()
        expect(p.isLast).toEqual(true)
        expect(p.matches(STEP10)).toEqual(true)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
        p = p.back()
        expect(p.isLast).toEqual(undefined)
      })
    })

  })

  describe('flow with data', () => {

    it('should create path from array of objects', () => {
      let path = create(d)
      expect(path.matches(STEP1)).toEqual(true)
    })

    it('data should be retrievable per step', () => {
      let path = create(d)
      expect(path.data.value).toEqual(1)
      path = path.next()
      expect(path.data.value).toEqual(2)
      path = path.next()
      expect(path.data.value).toEqual(3)
      path = path.next()
      expect(path.data.value).toEqual(4)
    })

  })
  
})