import * as React from 'react'

import { PoolStore } from '@/modules/Pool/stores/PoolStore'

export function usePool(): PoolStore {
    const ref = React.useRef<PoolStore>()
    ref.current = ref.current || new PoolStore()
    return ref.current
}