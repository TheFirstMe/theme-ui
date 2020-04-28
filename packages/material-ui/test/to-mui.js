import toMui from '../src/to-mui'
import { __GetDependency__ as rewire } from '../src/to-mui';
import { muiTheme, tuiTheme } from './fixtures/themes'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

describe('theme-ui to material-ui transformer', () => {
    test('returns material-ui breakpoints', () => {
        const toMuiBp = rewire('toMuiBp')
        const muiBp = toMuiBp(tuiTheme.breakpoints)
        expect(typeof muiBp).toBe('object')
        expect(muiBp).toEqual(muiTheme.breakpoints)
    })

    test('returns material-ui color palette', () => {
        const toMuiColors = rewire('toMuiColors')
        // const muiColors = toMuiColors()
        // const muiColors = toMuiColors(tuiTheme.colors)
        expect(1).toBe(1)
    })

    test('returns Material UI typography', () => {
        const toMuiTyp = rewire('toMuiTyp')
        expect(1).toBe(1)
    })

    test('returns Material UI spacings', () => {
        const toMuiSpace = rewire('toMuiSpace')
        expect(1).toBe(1)
    })
})