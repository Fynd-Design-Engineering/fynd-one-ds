import type { Meta, StoryObj } from '@storybook/react-vite';
import { VideoFrame } from './VideoFrame';

const BG_IMAGE =
  'https://cdn.prod.website-files.com/67a9c8e5f2c74ac8c2c9b88b/68303030b4715b1e2a190eeb_pexels-veeterzy-114979%201.png';

const VIDEO_SRC =
  'https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/original/webflow-team/Fynd_One/ai-pim/ai-pim.mp4';

const VIDEO_WEBM =
  'https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/original/webflow-team/Fynd_One/ai-pim/ai-pim.webm';

const meta: Meta<typeof VideoFrame> = {
  title: 'Content/VideoFrame',
  component: VideoFrame,
  parameters: { layout: 'padded' },
  argTypes: {
    backgroundImage: { control: 'text' },
    mobileBg: { control: 'text' },
    videoSrc: { control: 'text' },
    videoWebmSrc: { control: 'text' },
    poster: { control: 'text' },
    mobileVideoSrc: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof VideoFrame>;

export const Default: Story = {
  args: {
    backgroundImage: BG_IMAGE,
    videoSrc: VIDEO_SRC,
    videoWebmSrc: VIDEO_WEBM,
  },
};

export const WithMobileVideo: Story = {
  name: 'With mobile video swap',
  args: {
    backgroundImage: BG_IMAGE,
    videoSrc: VIDEO_SRC,
    videoWebmSrc: VIDEO_WEBM,
    mobileVideoSrc: VIDEO_SRC,
  },
};
