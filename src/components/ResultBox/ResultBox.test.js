import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const PLNtoUSD= [
    { amount: '100.00', result:'$28.57' },
    { amount: '20.00', result:'$5.71' },
    { amount: '200.00', result:'$57.14' },
    { amount: '345.00', result:'$98.57' },
  ];  

  const USDtoPLN= [
    { amount: '10.00', result:'PLN 35.00' },
    { amount: '20.00', result:'PLN 70.00' },
    { amount: '150.00', result:'PLN 525.00' },
    { amount: '345.00', result:'PLN 1,207.50' },
  ]; 
  
  const testCurrency= [
    { amount: '100.00', from: 'PLN', to: 'PLN', result: 'PLN 100.00', currency: 'PLN ' },
    { amount: '20.00', from: 'USD', to: 'USD', result: '$20.00', currency: '$' },
    { amount: '200.00', from: 'PLN', to: 'PLN', result: 'PLN 200.00', currency: 'PLN ' },
    { amount: '345.00', from: 'USD', to: 'USD', result: '$345.00', currency: '$' },
  ];

  const testCurrencyNegative= [
    { amount: '-100.00', from: 'PLN', to: 'USD', result: 'Wrong value...'},
    { amount: '-20.00', from: 'USD', to: 'PLN', result: 'Wrong value...'},
    { amount: '-200.00', from: 'PLN', to: 'USD', result: 'Wrong value...'},
    { amount: '-345.00', from: 'USD', to: 'PLN', result: 'Wrong value...'},
  ];

  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
      });
      for(const testObj of PLNtoUSD) {
    it('should render proper info about conversion when PLN -> USD', () => {
        render(<ResultBox from="PLN" to="USD" amount={parseInt(testObj.amount)} />);

        const mainDiv = screen.getByTestId('main-div');

        expect(mainDiv).toHaveTextContent('PLN ' + testObj.amount + ' = ' + testObj.result);
      });
    cleanup();
    };
        for(const testObj of USDtoPLN) {
    it('should render proper info about conversion when USD -> PLN', () => {
        render(<ResultBox from="USD" to="PLN" amount={parseInt(testObj.amount)} />);
    
        const mainDiv = screen.getByTestId('main-div');
    
        expect(mainDiv).toHaveTextContent('$' + testObj.amount + ' = ' + testObj.result);
        });
    cleanup();
    };
        for(const testObj of testCurrency) {
    it('should render proper info about conversion when same currency', () => {
        render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
        
        const mainDiv = screen.getByTestId('main-div');
        
        expect(mainDiv).toHaveTextContent(`${testObj.currency}${testObj.amount} = ${testObj.result}`);
        });
    cleanup();
    };

    for(const testObj of testCurrencyNegative) {
        it('should render Wrong Value... if value is negative', () => {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
            
            const mainDiv = screen.getByTestId('main-div');
            
            expect(mainDiv).toHaveTextContent(`${testObj.result}`);
            });
        cleanup();
        };
});