import { Avatar } from '@/shared/ui'

/** Jadvaldagi ism: rangli avatar (rasm yoki bosh harflar) + to'liq ism. */
export function PersonCell({ name, imageUrl }: { name?: string; imageUrl?: string }) {
    if (!name) return <span className="text-fg-faint">—</span>
    return (
        <span className="flex items-center gap-3">
            <Avatar name={name} src={imageUrl} size="sm" colorful />
            <span className="font-medium">{name}</span>
        </span>
    )
}
