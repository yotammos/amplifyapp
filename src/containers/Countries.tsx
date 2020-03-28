import * as React from 'react'
import { useState, useEffect } from 'react'
import { buildRequest, getData } from '../utils/restClient' // eslint-disable-line no-unused-vars
import { buildStyledTable } from '../utils/table'
import { capitalize } from '../utils/formatting'
import { COLUMN_NAMES, DATASETS_PATHS, PATHS } from '../utils/constants'
import Covid19CountryData from '../models/Covid19CountryData' // eslint-disable-line no-unused-vars
import StyledTr from '../models/styled/StyledTr'
import StyledTd from '../models/styled/StyledTd'
import { Link } from 'react-router-dom' // eslint-disable-line no-unused-vars

interface Props {
    isLocal: boolean
    validCountries: string[]
}

function Countries (props: Props): React.ReactElement {
  const { isLocal, validCountries } = props
  const [data, setData] = useState([] as Covid19CountryData[])
  const [dataPulled, setDataPulled] = useState(true)

  useEffect(() => {
    if (dataPulled) {
      setDataPulled(false)
      getData(buildRequest(DATASETS_PATHS.LATEST, isLocal))
        .then((value: Covid19CountryData[]) => {
          setData(value)
        })
    }
  }, [dataPulled, isLocal, data])

  const buildNameCol = (name: string | undefined) =>
    name && validCountries.includes(name) // eslint-disable-line react/prop-types
      ? <div>{name}</div>
      : <Link to={`${PATHS.COUNTRY}/${name}`}>{name}</Link>

  const buildStyledRow = (data: Covid19CountryData, index: number) => <StyledTr key={index + 1}>
    <StyledTd>{buildNameCol(data.name)}</StyledTd>
    <StyledTd>{data.cases}</StyledTd>
    <StyledTd>{data.deaths}</StyledTd>
  </StyledTr>

  const buildRows = () => data.map((row: Covid19CountryData, index: number) => buildStyledRow(row, index))

  return <div>
    <h1>Latest Country Data</h1>
    {buildStyledTable([
      capitalize(COLUMN_NAMES.NAME),
      capitalize(COLUMN_NAMES.CASES),
      capitalize(COLUMN_NAMES.DEATHS)
    ], buildRows)}
  </div>
}

export default Countries
