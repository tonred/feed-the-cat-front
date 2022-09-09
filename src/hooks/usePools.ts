import * as React from 'react'

import { PoolsStore } from '@/modules/Pool/stores/PoolsStore'

export function usePools(): PoolsStore {
    const ref = React.useRef<PoolsStore>()
    ref.current = ref.current || new PoolsStore()
    return ref.current
}