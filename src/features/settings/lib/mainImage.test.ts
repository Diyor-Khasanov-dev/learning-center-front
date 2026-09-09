import { describe, expect, it } from 'vitest'
import { isMainImage } from './mainImage'

describe('isMainImage', () => {
    it('returns true when the image URL matches meImageUrl', () => {
        const image = { id: 'img-1', imageUrl: 'https://example.com/avatar.jpg' }
        const meImageUrl = 'https://example.com/avatar.jpg'

        expect(isMainImage(image, meImageUrl)).toBe(true)
    })

    it('returns true when image URL and meImageUrl match after trimming spaces', () => {
        const image = { id: 'img-1', imageUrl: '  https://example.com/avatar.jpg  ' }
        const meImageUrl = 'https://example.com/avatar.jpg'

        expect(isMainImage(image, meImageUrl)).toBe(true)
    })

    it('returns false when image URLs do not match', () => {
        const image = { id: 'img-1', imageUrl: 'https://example.com/avatar1.jpg' }
        const meImageUrl = 'https://example.com/avatar2.jpg'

        expect(isMainImage(image, meImageUrl)).toBe(false)
    })

    it('returns false when value is empty, null or undefined', () => {
        expect(isMainImage(null, 'https://example.com/avatar.jpg')).toBe(false)
        expect(isMainImage(undefined, 'https://example.com/avatar.jpg')).toBe(false)
        expect(isMainImage({ imageUrl: '' }, 'https://example.com/avatar.jpg')).toBe(false)
        expect(isMainImage({ imageUrl: 'https://example.com/avatar.jpg' }, null)).toBe(false)
        expect(isMainImage({ imageUrl: 'https://example.com/avatar.jpg' }, undefined)).toBe(false)
        expect(isMainImage({ imageUrl: '   ' }, 'https://example.com/avatar.jpg')).toBe(false)
        expect(isMainImage({ imageUrl: 'https://example.com/avatar.jpg' }, '   ')).toBe(false)
    })
})
