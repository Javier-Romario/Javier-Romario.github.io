import * as Constants from './common/constants';
import * as React from 'react';

import Accordion from './Accordion';
import ActionBar from './ActionBar';
import ActionButton from './ActionButton';
import ActionListItem from './ActionListItem';
import AlertBanner from './AlertBanner';
import Avatar from './Avatar';
import Badge from './Badge';
import BarLoader from './BarLoader';
import BarProgress from './BarProgress';
import BlockLoader from './BlockLoader';
import Breadcrumbs from './Breadcrumbs';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Card from './Card';
import CardDouble from './CardDouble';
import Checkbox from './Checkbox';
import CRTOverlay from './CRTOverlay';
import CodeBlock from './CodeBlock';
import Dialog from './Dialog';
import Divider from './Divider';
import Drawer from './Drawer';
import GlitchText from './GlitchText';
import Grid from './Grid';
import GridCanvas from './GridCanvas';
import HexGrid from './HexGrid';
import Hologram, { type HologramShape } from './Hologram';
import Input from './Input';
import MatrixRain from './MatrixRain';
import Navigation from './Navigation';
import NeonTunnel from './NeonTunnel';
import NeuralField from './NeuralField';
import Radar from './Radar';
import Row from './Row';
import RowSpaceBetween from './RowSpaceBetween';
import Select from './Select';
import Spectrum from './Spectrum';
import Starfield from './Starfield';
import Table from './Table';
import TableColumn from './TableColumn';
import TableRow from './TableRow';
import Text from './Text';
import TextArea from './TextArea';
import Ticker from './Ticker';
import TickerBoard from './TickerBoard';
import Waveform from './Waveform';
import Window from './Window';

const HOLOGRAM_SHAPES: HologramShape[] = ['diamond', 'knot', 'torus', 'sphere', 'icosahedron'];

function HologramDemo() {
  const [shape, setShape] = React.useState<HologramShape>('diamond');

  return (
    <>
      <ButtonGroup
        items={HOLOGRAM_SHAPES.map((s) => ({
          body: s.toUpperCase(),
          selected: s === shape,
          onClick: () => setShape(s),
        }))}
      />
      <br />
      <br />
      <Hologram shape={shape} height={360} />
    </>
  );
}

export default function Showcase() {
  return (
    <div className="neondeck">
      <main style={{ maxWidth: 960, margin: '0 auto' }}>
        <Navigation
          logo="◆"
          left={<Badge>v0.1.0</Badge>}
          right={
            <>
              <ActionButton hotkey="⌘+T">THEME</ActionButton>
              <ActionButton hotkey="⌘+S">SYNC</ActionButton>
            </>
          }
        >
          NEONDECK
        </Navigation>

        <br />

        {/* hero: the signature ticker-board treatment */}
        <TickerBoard
          message="SYS.UPLINK // NODE 0x1F"
          messageTone="magenta"
          tickerLabel="NEONDECK"
          tickerItems={Constants.DEFAULT_TICKER_FEED}
          tickerSpeed={28}
          showBottomTicker
        >
          <Window>
            <div style={{ padding: '2rem 2ch' }}>
              <Row>
                <span style={{ color: 'var(--neon-teal)', fontSize: 26, textShadow: '0 0 12px var(--neon-teal)' }}>
                  NEONDECK
                </span>{' '}
                <Badge>CYBERPUNK UI</Badge>
              </Row>
              <Row style={{ color: 'var(--theme-muted)' }}>
                Terminal-monospace primitives, rebuilt with neon glows, semi-transparent glass, and ticker-board edge readouts.
              </Row>
              <Row>
                <ActionBar
                  items={[
                    { hotkey: '⌘+1', body: 'DECKS', selected: true },
                    { hotkey: '⌘+2', body: 'NETRUN' },
                    { hotkey: '⌘+3', body: 'GHOST' },
                  ]}
                />
              </Row>
            </div>
          </Window>
        </TickerBoard>

        <br />
        <br />

        <TickerBoard message="3D // HOLOGRAM" messageTone="magenta" tickerLabel="R3F" tickerItems={Constants.DEFAULT_TICKER_FEED} tickerSpeed={22}>
          <Card title="HOLOGRAM — R3F ISLAND">
            <Text>
              A three.js scene is just another island. Pick a shape, drag to orbit, hover to flip the neon. Zero extra config —
              the <code>shape</code> prop swaps the geometry.
            </Text>
            <br />
            <HologramDemo />
          </Card>
        </TickerBoard>

        <br />
        <br />

        <Grid>
          <Card title="SYNTHWAVE GRID">
            <GridCanvas height={200} />
          </Card>

          <Card title="MATRIX RAIN">
            <MatrixRain height={200} />
          </Card>

          <Card title="NEURAL FIELD — POKE IT">
            <NeuralField height={200} />
          </Card>

          <Card title="WAVEFORM">
            <Waveform height={200} />
          </Card>

          <Card title="RADAR">
            <Radar height={200} />
          </Card>

          <Card title="GLITCH TEXT">
            <GlitchText text="NEONDECK" height={200} />
          </Card>

          <Card title="HEX GRID">
            <HexGrid height={200} />
          </Card>

          <Card title="STARFIELD WARP">
            <Starfield height={200} speed={1.4} />
          </Card>

          <Card title="SPECTRUM">
            <Spectrum height={200} />
          </Card>

          <Card title="CRT OVERLAY">
            <CRTOverlay height={200}>
              <div style={{ padding: '1.2rem 1ch', fontFamily: 'var(--font-family-mono)' }}>
                <Row style={{ fontSize: 22, color: 'var(--theme-focused-foreground)' }}>SYSTEM READY</Row>
                <Row style={{ color: 'var(--theme-muted)' }}>scanlines · noise · vignette · rolling band</Row>
              </div>
            </CRTOverlay>
          </Card>

          <Card title="NEON TUNNEL — 3D">
            <NeonTunnel height={300} />
          </Card>

          <TickerBoard message="TICKER" tickerItems={['UPLINK', 'SYNC', 'LOCK']} tickerSpeed={16}>
            <Card title="TICKER BOARD">
              A small message box sits right above the component, while a scrolling ticker strip runs along the top edge. Toggle the
              bottom edge for a full HUD frame.
            </Card>
          </TickerBoard>

          <TickerBoard message="BUTTONS" messageTone="violet" showTopTicker={false}>
            <Card title="BUTTONS">
              <Button>Primary Button</Button>
              <br />
              <br />
              <Button theme="SECONDARY">Secondary Button</Button>
              <br />
              <br />
              <Button isDisabled>Disabled Button</Button>
            </Card>
          </TickerBoard>

          <Card title="INPUT">
            <Input label="HANDLE" placeholder="type your alias" autoComplete="off" />
            <br />
            <br />
            <Select name="sector" options={['Neo-Tokyo', 'Night City', 'Chiba City', 'The Sprawl']} defaultValue="Night City" />
            <br />
            <br />
            <TextArea autoPlay="The sky above the port was the color of television, tuned to a dead channel." />
          </Card>

          <Card title="PROGRESS">
            <BarLoader progress={64} />
            <br />
            <BarLoader intervalRate={80} />
            <br />
            <BarProgress progress={42} />
            <br />
            <BlockLoader mode={2} /> <BlockLoader mode={4} /> <BlockLoader mode={9} /> <BlockLoader mode={11} />
          </Card>

          <Card title="BUTTON GROUP">
            <ButtonGroup items={[{ body: '16 PX', selected: true }, { body: '32 PX' }, { body: '42 PX' }]} />
            <br />
            <br />
            <ButtonGroup isFull items={[{ body: 'ICE', selected: true }, { body: 'SENTRY' }, { body: 'DAEMON' }]} />
          </Card>

          <Card title="CHECKBOX">
            <Checkbox name="jack" defaultChecked>
              Jack into the matrix
            </Checkbox>
            <Checkbox name="ghost">Run silent, run deep</Checkbox>
            <Checkbox name="flatline">Flatline protocol</Checkbox>
          </Card>

          <CardDouble title="ALERT + DIVIDER">
            <AlertBanner>ICE detected on the uplink. Connection is being traced.</AlertBanner>
            <br />
            <Divider type="GRADIENT" />
            <br />
            <Text>
              The second law demands that machines can never be perfectly efficient. We are, despite our best intentions, agents of
              entropy.
            </Text>
            <br />
            <Divider type="DOUBLE" />
          </CardDouble>

          <Card title="ACCORDION">
            <Accordion defaultValue title="GHOST PROTOCOL">
              A console cowboy runs the ice with a deck and a prayer.
            </Accordion>
            <Accordion title="ICE-BREAKER v2.1">The ICE was black, and it was hungry.</Accordion>
            <Accordion title="NEURAL BRIDGE">A dream of chrome and rain.</Accordion>
          </Card>

          <Card title="DIALOG">
            <Dialog title="FLATLINE">There are unsaved changes. Are you sure you want to jack out?</Dialog>
          </Card>

          <Card title="DRAWER">
            <Drawer defaultValue>
              <ActionListItem icon="⊹">User Commands</ActionListItem>
              <ActionListItem icon="⊹">System Calls</ActionListItem>
              <ActionListItem icon="⊹">Daemons</ActionListItem>
            </Drawer>
          </Card>

          <Card title="BREADCRUMBS">
            <Breadcrumbs
              items={[
                { name: 'The Sprawl', url: '#' },
                { name: 'Chiba City', url: '#' },
                { name: 'Case', url: '#' },
                { name: 'Neuromancer' },
              ]}
            />
            <br />
            <br />
            <Avatar src="https://picsum.photos/seed/ghost/64/64">
              <span>
                MOLLY MILLIONS
                <br />
                <span style={{ color: 'var(--theme-muted)' }}>RAZORGIRL</span>
              </span>
            </Avatar>
          </Card>

          <Card title="TABLE">
            <Table>
              {Constants.SAMPLE_TABLE_DATA_CHANGE_ME.map((row, r) => (
                <TableRow key={r}>
                  {row.map((cell, c) => (
                    <TableColumn key={c}>{cell}</TableColumn>
                  ))}
                </TableRow>
              ))}
            </Table>
          </Card>

          <Card title="CODE BLOCK">
            <CodeBlock>{`function jackIn(deck) {
  deck.ice = 'black';
  deck.flatline = false;
  return deck.run();
}`}</CodeBlock>
          </Card>
        </Grid>

        <br />
        <br />

        <TickerBoard message="SYS.LOG // FEED" tickerLabel="LIVE" tickerItems={Constants.DEFAULT_TICKER_FEED} tickerSpeed={20}>
          <Card title="EDGE TICKER">
            <RowSpaceBetween>
              <span>Standalone ticker strips can live on any edge.</span>
              <Badge>▣</Badge>
            </RowSpaceBetween>
          </Card>
        </TickerBoard>

        <br />

        <Ticker items={Constants.DEFAULT_TICKER_FEED} label="STANDALONE" tone="magenta" speed={18} />
      </main>
    </div>
  );
}
