import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Register, normalisePhone } from '../pages/Register'

function renderRegister() {
  return render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>,
  )
}

describe('Register', () => {
  it('keeps the send button off until the cancellation policy is accepted', async () => {
    renderRegister()
    const send = screen.getByRole('button', { name: /send order on whatsapp/i })
    expect(send).toBeDisabled()

    await userEvent.click(screen.getByRole('checkbox', { name: /cancellation policy/i }))
    expect(send).toBeEnabled()
  })

  it('updates the total when the size and plan change', async () => {
    renderRegister()
    expect(screen.getAllByText('₹396').length).toBeGreaterThan(0)

    await userEvent.click(screen.getByRole('radio', { name: /elite — 50 g protein/i }))
    await userEvent.click(screen.getByRole('radio', { name: /5-day week/i }))
    expect(screen.getAllByText('₹800').length).toBeGreaterThan(0)
  })

  it('shows the egg option only for veg', async () => {
    renderRegister()
    expect(screen.queryByLabelText(/i eat egg/i)).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('radio', { name: 'Veg' }))
    expect(screen.getByLabelText(/i eat egg/i)).toBeInTheDocument()
  })

  it.skip('lets you pick Monday protein only at full add-on price', async () => {
    renderRegister()
    await userEvent.click(screen.getByRole('radio', { name: /core — 30 g protein/i }))
    await userEvent.click(screen.getByRole('radio', { name: /custom pick days/i }))
    await userEvent.click(screen.getByRole('button', { name: /black pepper chicken/i }))
    expect(screen.getAllByText('₹100').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/14 g protein/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/add-ons at full price/i)).toBeInTheDocument()
  })
})

describe('normalisePhone', () => {
  it('strips spaces and a +91 prefix', () => {
    expect(normalisePhone('+91 98765 43210')).toBe('9876543210')
    expect(normalisePhone('98765-43210')).toBe('9876543210')
  })
})
