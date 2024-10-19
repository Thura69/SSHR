import React from 'react'
import { Button } from '../../ui/button'

export const Buttons = () => {
    return (
        <div className="flex gap-5">
            <div className="flex flex-col space-y-2">
                <label>Primary Buttons</label>
                <div>
                    <Button variant="primary" size="lg">
                        Save
                    </Button>
                </div>
                <div>
                    <Button variant="primary" size="md">
                        Save
                    </Button>
                </div>
                <div>
                    <Button variant="primary" size="sm">
                        Save
                    </Button>
                </div>
            </div>

            <div className="flex flex-col space-y-2">
                <label>Secondary Buttons</label>
                <div>
                    <Button variant="outline" size="lg">
                        Save
                    </Button>
                </div>
                <div>
                    <Button variant="outline" size="md">
                        Save
                    </Button>
                </div>
                <div>
                    <Button variant="outline" size="sm">
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}
