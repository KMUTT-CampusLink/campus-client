import React from 'react';
import { Box } from '@mui/material';

const CenteredBox = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#F2F2F2',  
          width: '100%',
          height: '100vh',             
          display: 'flex',             
          justifyContent: 'center',    
          alignItems: 'center'         
        }}
      >
        <Box
          sx={{
            backgroundColor: '#FFFFFF',  
            width: '50%',               
            height: '80%',              
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
            borderRadius: '20px',       
            marginTop: '50px',          
            padding: '24px',            
            overflow: 'auto',           
          }}
        >
          {children} {}
        </Box>
      </Box>
    </>
  );
};

export default CenteredBox;
