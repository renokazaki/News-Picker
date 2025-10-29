import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/components/ui/tooltip';
import React from 'react';

const ToolTip = () => {
  return (
    <Tooltip>
      <TooltipTrigger>Hover</TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ToolTip;
