import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

/**
 * 현재 퀘스트 정보를 표시하는 카드 컴포넌트
 * @param {object} props
 * @param {object} props.currentQuest - 현재 퀘스트 객체 (없으면 null)
 * @param {function} props.onComplete - 카드를 클릭했을 때 실행될 함수
 */
const QuestCard = ({ currentQuest, onComplete }) => {
  return (
    <Paper
      elevation={3}
      // currentQuest가 있을 때만 onComplete 함수를 실행합니다.
      onClick={() => currentQuest && onComplete(currentQuest.id)}
      sx={{
        width: '90%',
        p: 2,
        backgroundColor: '#4A5C4A',
        color: 'white',
        borderRadius: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: currentQuest ? 'pointer' : 'default',
        opacity: currentQuest ? 1 : 0.7,
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1, // 다른 요소 위에 보이도록 zIndex 추가
      }}
    >
      {currentQuest ? (
        // 진행할 퀘스트가 있는 경우
        <>
          <Box>
            <Typography variant="h6">{currentQuest.title}</Typography>
            <Typography variant="body2">{currentQuest.description}</Typography>
          </Box>
          <Typography variant="h4">&gt;</Typography>
        </>
      ) : (
        // 모든 퀘스트를 완료한 경우
        <Box>
          <Typography variant="h6">🎉 모든 퀘스트 완료!</Typography>
          <Typography variant="body2">오늘은 편히 쉬셔도 좋아요.</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default QuestCard;