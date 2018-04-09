import * as React from "react";
import TopBarProgressIndicator from "react-topbar-progress-indicator";

TopBarProgressIndicator.config({
  barThickness: 4,
  barColors: {
    "0": "#fff",
    "1.0": "#fff"
  },
  shadowBlur: 5
});

const devicePixelRatio =
  typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;

const tupleToColor = (param, alpha) => `rgba(${param.join(",")}, ${alpha})`;

type Props = {|
  size: number,
  color: $ReadOnlyArray<number, number, number>
|};

class ActivityIndicator extends React.Component<Props> {
  static defaultProps = {
    size: 24.0,
    color: [200, 200, 200]
  };
  componentDidMount() {
    this.tick();
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.frame);
  }
  setCanvasRef = canvas => {
    if (canvas) {
      this.canvasContext = canvas.getContext("2d");
    }
  };
  draw() {
    const context = this.canvasContext;
    if (!context) {
      return;
    }
    const actualSize = this.props.size * devicePixelRatio;
    context.clearRect(0.0, 0.0, actualSize, actualSize);
    context.translate(actualSize / 2.0, actualSize / 2.0);
    context.rotate(0.172665);
    context.translate(-(actualSize / 2.0), -(actualSize / 2.0));
    const centeredArc = (...args) =>
      context.arc(actualSize / 2.0, actualSize / 2.0, ...args);
    context.beginPath();
    centeredArc(actualSize * 0.5, Math.PI, 0.0, false, context);
    centeredArc(actualSize * 0.3, 0.0, Math.PI, true, context);
    context.fillStyle = tupleToColor(this.props.color, 1.0);
    context.fill();
    context.closePath();
    context.beginPath();
    centeredArc(actualSize * 0.5, 0.0, Math.PI, false, context);
    centeredArc(actualSize * 0.3, Math.PI, 0.0, true, context);
    const gradient = context.createLinearGradient(
      0.0,
      actualSize * 0.5,
      actualSize * 0.75,
      actualSize * 0.5
    );
    gradient.addColorStop(0.5, tupleToColor(this.props.color, 1.0));
    gradient.addColorStop(1.0, tupleToColor(this.props.color, 0.0));
    context.fillStyle = gradient;
    context.fill();
  }
  tick = () => {
    this.draw();
    this.frame = requestAnimationFrame(this.tick);
  };
  render() {
    const actualSize = this.props.size * devicePixelRatio;
    return (
      <React.Fragment>
        <TopBarProgressIndicator />
        <canvas
          width={actualSize}
          height={actualSize}
          /* eslint-disable react-native/no-inline-styles */
          style={{
            width: this.props.size,
            height: this.props.size,
            alignSelf: "center",
            margin: "10px 0"
          }}
          ref={this.setCanvasRef}
        />
      </React.Fragment>
    );
  }
}

export default ActivityIndicator;
