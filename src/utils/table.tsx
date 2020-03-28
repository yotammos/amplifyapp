import * as React from 'react'
import StyledTable from '../models/styled/StyledTable'
import StyledTh from '../models/styled/StyledTh'
import StyledTr from '../models/styled/StyledTr'

export const buildStyledTable = (cols: Array<string>, buildRows: () => any) =>
  <StyledTable>
    <thead>
      <StyledTr key={0}>
        {cols.map((col, index) => <StyledTh key={index}>{col}</StyledTh>)}
      </StyledTr>
    </thead>
    <tbody>
      {buildRows()}
    </tbody>
  </StyledTable>
