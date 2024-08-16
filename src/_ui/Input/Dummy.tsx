import React, { ReactNode, useCallback, useState } from 'react'
import { TouchableOpacity } from '../tab/TouchableOpacity'
import { TxtTab } from '../tab/TxtTab'

type Props = {
    value: any
    onClick?: () => void
    placeholder: string
    tab?: { onClick?: any; name: string; size?: number; color?: string; disabled?: boolean }
}

export default function Dummy({ placeholder, value, onClick, tab }: Props) {
    const [isFocused, setIsFocused] = useState(false)
    const handleFocus = useCallback(() => setIsFocused(true), [isFocused])
    const handleBlur = useCallback(() => setIsFocused(false), [isFocused])

    return (
        <TouchableOpacity
            width="100%"
            minHeight={50}
            maxHeight={50}
            borderRadius={14}
            border={{ solid: 1, position: 'all', color: '#e2e2e2' }}
            onClick={onClick}
            backgroundColor="#fff"
            txtColor={value ? '#555' : '#c2c2c2'}
        >
            <div css={{ width: '100%', height: '100%', padding: '13px 0 13px 13px' }}>
                {value ? value : placeholder}
            </div>

            {!!tab && (
                <TxtTab
                    color={tab.color ?? '#4788f4'}
                    size={tab.size ?? 14}
                    onMouseEnter={!tab.disabled ? (handleFocus as any) : null}
                    onMouseLeave={!tab.disabled ? (handleBlur as any) : null}
                    onClick={() => tab.onClick && tab.onClick()}
                    padding={{ vertical: 10, right: 10, left: 6 }}
                    css={{ whiteSpace: 'nowrap' }}
                    disabled={tab.disabled}
                >
                    {tab.name ?? '확인'}
                </TxtTab>
            )}
        </TouchableOpacity>
    )
}
