const { calculateTip, celciusToFahrenheit, fahrenheitToCelcius } = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, 0.3)
    expect(total).toBe(13) 
})

test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)  
})

test('Should convert 32F to 0 C', () => {
    const temp = fahrenheitToCelcius(32)
    expect(temp).toBe(0)
    
})

test('Should convert 0 C To 32F', () => {
    const temp = celciusToFahrenheit(0)
    expect(temp).toBe(32)
    
})