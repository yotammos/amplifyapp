import * as React from 'react'
import { useState, useEffect } from 'react'
import { match } from 'react-router-dom' // eslint-disable-line no-unused-vars
import { buildRequest, getData } from '../utils/restClient' // eslint-disable-line no-unused-vars
import Covid19DatedData from '../models/Covid19DatedData' // eslint-disable-line no-unused-vars
import { buildStyledTable } from '../utils/table'
import {capitalize, formatAmount} from '../utils/formatting'
import { COLUMN_NAMES } from '../utils/constants'
import StyledTr from '../models/styled/StyledTr'
import StyledTd from '../models/styled/StyledTd'

type TParams = {
    name?: string
}

interface Props {
    isLocal: boolean
    apiUrl: string
    name?: string
    match?: match<TParams>
}

const buildStyledRow = (data: Covid19DatedData, index: number) => <StyledTr key={index + 1}>
  <StyledTd>{formatAmount(data.cases)}</StyledTd>
  <StyledTd>{formatAmount(data.deaths)}</StyledTd>
  <StyledTd>{data.date}</StyledTd>
</StyledTr>

const Country: React.FC<Props> = (props: Props) => {
  const { isLocal, apiUrl, name, match } = props
  const [data, setData] = useState([] as Covid19DatedData[])
  const [dataPulled, setDataPulled] = useState(true)
  const header: string | undefined = name || match?.params?.name

  useEffect(() => {
    if (dataPulled) {
      setDataPulled(false)
      getData(buildRequest(apiUrl, isLocal, match?.params?.name))
        .then((value: Covid19DatedData[]) => {
          setData(value)
        })
    }
  }, [dataPulled, isLocal, data, apiUrl, match])

  const buildRows = () => data.map((row: Covid19DatedData, index: number) => buildStyledRow(row, index))

  return <div>
    <h1>{header} Data</h1>
    {buildStyledTable([
      capitalize(COLUMN_NAMES.CASES),
      capitalize(COLUMN_NAMES.DEATHS),
      capitalize(COLUMN_NAMES.DATE)
    ], buildRows)}
  </div>
}

export default Country
