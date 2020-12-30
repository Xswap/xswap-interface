import { ChainId, TokenAmount } from '@xswap/sdk'
import React, { useMemo } from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import tokenLogo from '../../assets/images/token-logo.png'
import { XSWAP } from '../../constants'
import { useTotalSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
import { useMerkleDistributorContract } from '../../hooks/useContract'
import useCurrentBlockTimestamp from '../../hooks/useCurrentBlockTimestamp'
import { useTotalXswapEarned } from '../../state/stake/hooks'
import { useAggregateXswapBalance, useTokenBalance } from '../../state/wallet/hooks'
import { ExternalLink, StyledInternalLink, TYPE, XswapTokenAnimated } from '../../theme'
import { computeXswapCirculation } from '../../utils/computeXswapCirculation'
import useUSDCPrice from '../../utils/useUSDCPrice'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { Break, CardBGImage, CardNoise, CardSection, DataCard } from '../earn/styled'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ff007a 0%, #021d43 100%);
  padding: 0.5rem;
`

const StyledClose = styled(X)`
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`

/**
 * Content for balance stats modal
 */
export default function XswapBalanceContent({ setShowXswapBalanceModal }: { setShowXswapBalanceModal: any }) {
  const { account, chainId } = useActiveWeb3React()
  const Xswap = chainId ? XSWAP[chainId] : undefined

  const total = useAggregateXswapBalance()
  const xswapBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, xswap)
  const xswapToClaim: TokenAmount | undefined = useTotalXswapEarned()

  const totalSupply: TokenAmount | undefined = useTotalSupply(xswap)
  const xswapPrice = useUSDCPrice(xswap)
  const blockTimestamp = useCurrentBlockTimestamp()
  const unclaimedXswap = useTokenBalance(useMerkleDistributorContract()?.address, xswap)
  const circulation: TokenAmount | undefined = useMemo(
    () =>
      blockTimestamp && xswap && chainId === ChainId.MAINNET
        ? computeXswapCirculation(xswap, blockTimestamp, unclaimedXswap)
        : totalSupply,
    [blockTimestamp, chainId, totalSupply, unclaimedXswap, xswap]
  )

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween>
            <TYPE.white color="white">Your XSWAP Breakdown</TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowXswapBalanceModal(false)} />
          </RowBetween>
        </CardSection>
        <Break />
        {account && (
          <>
            <CardSection gap="sm">
              <AutoColumn gap="md" justify="center">
                <XswapTokenAnimated width="48px" src={tokenLogo} />{' '}
                <TYPE.white fontSize={48} fontWeight={600} color="white">
                  {total?.toFixed(2, { groupSeparator: ',' })}
                </TYPE.white>
              </AutoColumn>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">Balance:</TYPE.white>
                  <TYPE.white color="white">{xswapBalance?.toFixed(2, { groupSeparator: ',' })}</TYPE.white>
                </RowBetween>
                <RowBetween>
                  <TYPE.white color="white">Unclaimed:</TYPE.white>
                  <TYPE.white color="white">
                    {xswapToClaim?.toFixed(4, { groupSeparator: ',' })}{' '}
                    {xswapToClaim && xswapToClaim.greaterThan('0') && (
                      <StyledInternalLink onClick={() => setShowXswapBalanceModal(false)} to="/xswap">
                        (claim)
                      </StyledInternalLink>
                    )}
                  </TYPE.white>
                </RowBetween>
              </AutoColumn>
            </CardSection>
            <Break />
          </>
        )}
        <CardSection gap="sm">
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.white color="white">XSWAP price:</TYPE.white>
              <TYPE.white color="white">${xswapPrice?.toFixed(2) ?? '-'}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">XSWAP in circulation:</TYPE.white>
              <TYPE.white color="white">{circulation?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">Total Supply</TYPE.white>
              <TYPE.white color="white">{totalSupply?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            {xswap && xswap.chainId === ChainId.MAINNET ? (
              <ExternalLink href={`https://xswap.io/info/token/${xswap.address}`}>View XSWAP Analytics</ExternalLink>
            ) : null}
          </AutoColumn>
        </CardSection>
      </ModalUpper>
    </ContentWrapper>
  )
}
