import {beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import Table from '../components/Table';

describe('Table', () => {
    let mockFn = vi.fn();
    let mockFetchCountries = vi.fn();

    beforeEach(() => {
        mockFetchCountries.mockResolvedValueOnce([
            {
                cioc: 'SGS',
                cca2: 'GS',
                flags: { png: 'https://flagcdn.com/w320/gs.png' },
                name: { common: 'South Georgia', official: 'South Georgia and the South Sandwich Islands' }
            }
        ]);

        render(<Table
            sortedcountries={[]}
            toogleSort={mockFn}
            showColor={true}
            setcountries={mockFn}
        />);
    });

    it('Se muestra el titulo de la tabla', () => {
        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1).toBeInTheDocument();
        expect(h1.textContent).toBe('Table');
    });

    it('Se muestra la tabla', () => {
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
    });

});