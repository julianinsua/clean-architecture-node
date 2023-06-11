import consolear from '../../src/consolear'

describe('consolear', () => {
	it('should return the string', async () => {
		const str = 'asdfasdfasdf'
		const result = consolear(str)

		expect(result).toEqual(str)
	})

	it('should console.log the string', async () => {})
})
