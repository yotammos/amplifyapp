import * as React from 'react'
import { useState, useEffect } from 'react'
import { DetailedRequest, getData } from '../utils/restClient' // eslint-disable-line no-unused-vars
import Covid19Data from '../models/Covid19Data' // eslint-disable-line no-unused-vars
import { buildStyledRow, buildStyledTable } from '../utils/table'
import { capitalize } from '../utils/formatting'
import { DATA_COUNT } from '../utils/constants'

interface Props {}

const Global: React.FC<Props> = (props: Props) => {
    const [data, setData] = useState(new Array<Covid19Data>())

    useEffect(() => {
        data.length < 1 ? getData({ path: '/global', host: 'mossbeanstalk-env.eba-uetagxqr.us-east-2.elasticbeanstalk.com', port: 80 } as DetailedRequest)
                .then((value: Covid19Data[]) => {
                    console.log(data)
                    setData(value)
                })
            : console.log('data already exists')
    })

    const buildRows = () => data.map((row: Covid19Data, index: number) => buildStyledRow(row, index))

    return <div>
        <h1>Global Data</h1>
        {buildStyledTable([
            capitalize(DATA_COUNT.CASES),
            capitalize(DATA_COUNT.DEATHS),
            capitalize(DATA_COUNT.DATE)
        ], buildRows)}
    </div>
}

export default Global
