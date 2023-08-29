import { Box, Button, Skeleton, Typography, styled } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import GroupsIcon from '@mui/icons-material/Groups';
import Grid from '@mui/material/Unstable_Grid2';

const FactionTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: theme.typography.pxToRem(12),
  },
}));

export default function FactionCard({ faction }) {
  return (
    <>
      <Box borderRadius={1} boxShadow={4}>
        {/* Faction Header (is hiring) */}
        {
          faction.isRecruiting !== undefined
            ? <Box sx={{ backgroundColor: !faction.isRecruiting ? 'rgba(220, 38, 38, 0.3)' : 'rgba(56, 142, 60, 0.3)', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, textAlign: 'center' }}>
              <Typography variant="caption">{faction.isRecruiting ? 'Recruiting' : 'Not Recruiting'}</Typography>
            </Box>
            : <Skeleton variant="rounded" animation="wave" sx={{ backgroundColor: 'rgba(56, 142, 60, 0.3)', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} />
        }
        <Grid container paddingX={1} paddingBottom={1}>
          {/* Faction Avatar */}
          <Grid container xs={3} display={'flex'} direction={'column'} alignItems={'center'} sx={{ padding: '4px' }} >
            <Grid width={24} height={24}>
              <GroupsIcon />
            </Grid>
            <Grid>
              {
                faction.symbol !== undefined
                  ? <Typography variant="caption" fontWeight={600}>{faction.symbol}</Typography>
                  : <Skeleton variant="rectangular" animation="wave" height={12} width={56} sx={{ marginLeft: '4px' }} />
              }
            </Grid>
          </Grid>
          {/* Faction Details */}
          <Grid xs={9} container display={'flex'} direction={'column'} alignItems={'start'} sx={{ padding: '4px' }}>
            <Grid>
              {
                faction.name !== undefined
                  ? <Typography variant="subtitle1" fontWeight={700}>{faction.name}</Typography>
                  : <Skeleton variant="rectangular" animation="wave" height={24} width={160} />
              }
            </Grid>
            <Grid>
              {
                faction.headquarters !== undefined
                  ? <Typography variant="caption">{faction.headquarters}</Typography>
                  : <Skeleton variant="rectangular" animation="wave" height={16} width={120} />
              }
            </Grid>
          </Grid>
          {/* Faction Tags */}
          <Grid xs={12} display={'flex'} flexWrap={'wrap'} alignItems={'start'} gap={1} sx={{ padding: '4px' }}>
            {
              faction.traits?.length
                ? <>
                  {faction.traits.map((trait, i) => <FactionTooltip enterTouchDelay={0} arrow title={trait.description} key={i} sx={{ pointerEvents: 'none' }}><Button color="info" variant="outlined" size="small" >{trait.name}</Button></FactionTooltip>)}
                </>
                : <>
                  <Skeleton variant="rounded" animation="wave" height={24} width={'25%'} />
                  <Skeleton variant="rounded" animation="wave" height={24} width={'25%'} />
                  <Skeleton variant="rounded" animation="wave" height={24} width={'25%'} />
                  <Skeleton variant="rounded" animation="wave" height={24} width={'25%'} />
                </>
            }

          </Grid>
          {/* Faction Description */}
          <Grid xs={12} sx={{ padding: '4px' }}>
            {
              faction.description !== undefined
                ? <Typography variant="body2">{faction.description}</Typography>
                : <Skeleton variant="rectangular" animation="wave" height={84} />
            }
          </Grid>
        </Grid>
      </Box>
    </>
  );
}