import React from 'react'

const AuditTrailActions = ({
    isViewEvent,
    onDetailClick,
    onActionClick,
    toggleValue,
}: {
    isViewEvent: boolean
    onDetailClick: Function
    onActionClick: Function
    toggleValue: boolean
}) => {
    const handleDetailClick = () => {
        onDetailClick()
    }

    const handleActionClick = () => {
        onActionClick()
    }

    return (
        <div className="flex">
            {!isViewEvent ? (
                <button
                    className="text-xs font-bold text-primary-600 cursor-pointer"
                    onClick={handleActionClick}
                >
                    {toggleValue ? 'Show' : 'Hide'} Changes
                </button>
            ) : null}

            {isViewEvent ? (
                <button
                    className="text-xs font-bold text-primary-600 cursor-pointer"
                    onClick={handleDetailClick}
                >
                    Details
                </button>
            ) : null}
        </div>
    )
}

export default AuditTrailActions
