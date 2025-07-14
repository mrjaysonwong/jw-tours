import React, { useState } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  Divider,
  Box,
  IconButton,
} from '@mui/material';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import ChecklistIcon from '@mui/icons-material/Checklist';
import RuleIcon from '@mui/icons-material/Rule';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { SkeletonCard } from '@/components/loaders/Skeletons';

const ToolbarTextEditor = ({ editor }) => {
  const [headingLevel, setHeadingLevel] = useState('p');
  
  if (!editor) return <SkeletonCard l={1} h="230px" />;


  const handleHeadingChange = (event) => {
    const level = event.target.value;
    setHeadingLevel(level);

    if (!editor) return;

    if (level === 'p') {
      editor.chain().focus().setParagraph().run(); // Reset to paragraph
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: parseInt(level) })
        .run();
    }
  };

  return (
    <Box sx={{ mx: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 1,
          py: 2,

          '& button': {
            borderRadius: '4px',
            p: 0.3,
          },

          '& svg': {
            cursor: 'pointer',
          },
          '& hr': {
            minHeight: '25px',
          },
        }}
      >
        <FormControl
          variant="outlined"
          style={{ marginRight: '10px', width: '150px' }}
        >
          <Select
            name="headings"
            size="small"
            value={headingLevel}
            onChange={handleHeadingChange}
          >
            <MenuItem value="p">Paragraph</MenuItem>
            <MenuItem value="1" sx={{ fontSize: '2rem' }}>
              Heading 1
            </MenuItem>
            <MenuItem value="2" sx={{ fontSize: '1.5rem' }}>
              Heading 2
            </MenuItem>
            <MenuItem value="3" sx={{ fontSize: '1.3rem' }}>
              Heading 3
            </MenuItem>
            <MenuItem value="4" sx={{ fontSize: '1rem' }}>
              Heading 4
            </MenuItem>
            <MenuItem value="5" sx={{ fontSize: '0.83rem' }}>
              Heading 5
            </MenuItem>
            <MenuItem value="6" sx={{ fontSize: '0.67rem' }}>
              Heading 6
            </MenuItem>
          </Select>
        </FormControl>

        <Divider orientation="vertical" variant="middle" flexItem />

        {/* Bold */}
        <IconButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          color={editor.isActive('bold') ? 'primary' : 'default'}
        >
          <FormatBoldIcon />
        </IconButton>

        {/* Italic */}
        <IconButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          color={editor.isActive('italic') ? 'primary' : 'default'}
        >
          <FormatItalicIcon />
        </IconButton>

        {/* Underline */}
        <IconButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          color={editor.isActive('underline') ? 'primary' : 'default'}
        >
          <FormatUnderlinedIcon />
        </IconButton>

        {/* Strike */}
        <IconButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          color={editor.isActive('strike') ? 'primary' : 'default'}
        >
          <StrikethroughSIcon />
        </IconButton>

        <Divider orientation="vertical" variant="middle" flexItem />

        {/* Bulleted list */}
        <IconButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          color={editor.isActive('bulletList') ? 'primary' : 'default'}
        >
          <FormatListBulletedIcon />
        </IconButton>

        {/* Ordered list */}
        <IconButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          color={editor.isActive('orderedList') ? 'primary' : 'default'}
        >
          <FormatListNumberedIcon />
        </IconButton>

        {/* Insert Checkmark */}
        <IconButton onClick={() => editor.commands.insertCheckmark()}>
          <ChecklistIcon />
        </IconButton>

        {/* Insert Crossmark */}
        <IconButton onClick={() => editor.commands.insertCrossmark()}>
          <RuleIcon />
        </IconButton>

        <Divider orientation="vertical" variant="middle" flexItem />

        {/* Align Left */}
        <IconButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          color={editor.isActive({ textAlign: 'left' }) ? 'primary' : 'default'}
        >
          <FormatAlignLeftIcon />
        </IconButton>

        {/* Align Center */}
        <IconButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          color={
            editor.isActive({ textAlign: 'center' }) ? 'primary' : 'default'
          }
        >
          <FormatAlignCenterIcon />
        </IconButton>

        {/* Align Right */}
        <IconButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          color={
            editor.isActive({ textAlign: 'right' }) ? 'primary' : 'default'
          }
        >
          <FormatAlignRightIcon />
        </IconButton>

        {/* Justify */}
        <IconButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          color={
            editor.isActive({ textAlign: 'justify' }) ? 'primary' : 'default'
          }
        >
          <FormatAlignJustifyIcon />
        </IconButton>

        <Divider orientation="vertical" variant="middle" flexItem />

        {/* Add Link */}
        <IconButton
          onClick={() => {
            const previousUrl = editor.getAttributes('link').href;
            const url = window.prompt('Enter URL:', previousUrl);

            if (url === null) return; // Cancelled
            if (url === '') {
              editor.chain().focus().extendMarkRange('link').unsetLink().run();
              return;
            }

            try {
              editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: url })
                .run();
            } catch (e) {
              alert(e.message);
            }
          }}
          color={editor.isActive('link') ? 'primary' : 'default'}
        >
          <AddLinkIcon />
        </IconButton>

        {/* Remove Link */}
        <IconButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
        >
          <LinkOffIcon />
        </IconButton>

        {/* Insert Image */}
        {/* <IconButton
          onClick={() => {
            const url = prompt('Enter Image URL:');
            if (url) {
              editor
                .chain()
                .focus()
                .setImage({
                  src: url,
                  alt: 'Example image',
                  title: 'An example',
                })
                .run();
            }
          }}
        >
          <InsertPhotoIcon />
        </IconButton> */}

        <Divider orientation="vertical" variant="middle" flexItem />

        {/* Clear Formatting */}
        <IconButton
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
        >
          <FormatClearIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ToolbarTextEditor;
