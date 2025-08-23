import React from 'react';
import { Box, Paper, Typography, LinearProgress } from '@mui/material';

// 프로그레스 바 스타일 (이전과 동일)
const BorderLinearProgress = (props) => (
  <LinearProgress
    variant="determinate"
    {...props}
    sx={{
      height: 10,
      borderRadius: 5,
      [`& .MuiLinearProgress-bar`]: {
        borderRadius: 5,
        backgroundColor: '#6EE86E',
      },
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    }}
  />
);

/**
 * XP 바 컴포넌트
 * @param {object} props
 * @param {number} props.majorLevel - 현재 대단계 (Level)
 * @param {number} props.currentSteps - 현재 채워진 칸 수 (0~9)
 */
const XPBar = ({ majorLevel, currentSteps }) => {
  const totalSteps = 10;
  // 진행도를 퍼센트로 계산 (예: 5칸 채워졌으면 50%)
  const progress = (currentSteps / totalSteps) * 100;

  return (
    <Paper elevation={3} sx={{
      width: '90%',
      p: 2,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      color: 'white',
      borderRadius: '16px',
    }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Level {majorLevel}</Typography>
      <BorderLinearProgress value={progress} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
        <Typography variant="caption">{currentSteps}</Typography>
        <Typography variant="caption">{totalSteps}</Typography>
      </Box>
    </Paper>
  );
};

export default XPBar;