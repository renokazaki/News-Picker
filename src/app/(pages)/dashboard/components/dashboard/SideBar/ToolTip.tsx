import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/components/ui/tooltip';
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
