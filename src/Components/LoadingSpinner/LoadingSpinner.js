import './style.css';
import React from 'react';
import raf from 'raf';
import  bezierEasing from 'bezier-easing';

/*
 * React Material Design Loading Spinner
 * Based off https://material.io/guidelines/components/progress-activity.html#progress-activity-types-of-indicators
 */
class LoadingSpinner extends React.Component {
  circleHeight=0;
  circleWidth=0;
  circleLeft=0;
  circleTop=0;
  constructor(props) {
    super(props);

    this.state = {
      flipArcDirection: false,
      rotationCompletion: 0,
      arcCompletion: 0,
      rotationOffset: 0,
    };
  }

  UNSAFE_componentWillMount() {
    const rotationDuration = this.props.rotationDuration;
    const arcDuration = this.props.arcDuration;
    let arcTimeStart = null;
    let rotationTimeStart = null;
    let flipArcDirection = false;
    let rotationOffset = 0;
    let halfCycleCounter = 0;

    const step = (timestamp) => {
      // Set starting times for future calculations
      if (!arcTimeStart) arcTimeStart = timestamp;
      if (!rotationTimeStart) rotationTimeStart = timestamp;
      
      // Get's the progress of the animations from 0-1 where 0 is the start and 1 is the end
      let rotationProgress = (timestamp - rotationTimeStart) / rotationDuration;
      let arcProgress = (timestamp - arcTimeStart) / arcDuration;
      
      // Don't let the progress be greater than 1, which is the end
      if (arcProgress > 1) arcProgress = 1;
      if (rotationProgress > 1) rotationProgress = 1;
      
      // Apply easing to the progress so it looks nicer
      // The easing is customizable, but it defaults to
      // the standard material design easing curve
      const arcCompletion = this.props.easing(arcProgress);
      const rotationCompletion = rotationProgress; // Linear easing
            
      // Set's the state variables which are used in the render function
      this.setState({
        arcCompletion,
        rotationCompletion,
        flipArcDirection,
        rotationOffset,
      });

      // Restart the rotation when it's done
      if (rotationProgress === 1) {
        rotationTimeStart = null;
      }

      // Restart the arc when it's done
      // Also flip the arc so it goes backwards next time
      if (arcProgress === 1) {
        arcTimeStart = null;
        flipArcDirection = !flipArcDirection;
        
        // Count how many half cycles we've done
        // i.e. each arc extension is a half cycle
        halfCycleCounter += 1;
        if (halfCycleCounter === 2) {
          halfCycleCounter = 0;
        }

        // Increase the rotation so it doesn't jump backwards
        // when the arc reverses
        if (halfCycleCounter === 1) {
          rotationOffset += this.props.maxArcAngle;
        }

        // Rotation offset only needs to be within 0-360
        if (rotationOffset > 360) {
          rotationOffset -= 360;
        }
      }

      this.requestId = raf(step);
    };

    // Save the request id so we can clean it up later
    // Uses raf, a polyfill for requestAnimationFrame
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    // https://www.npmjs.com/package/raf
    this.requestId = raf(step);
  }

  // Clean up our animation frame loop
  componentWillUnmount() {
    raf.cancel(this.requestId);
  }

  // https://stackoverflow.com/a/18473154
  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians)),
    };
  }

  // https://stackoverflow.com/a/18473154
  describeArc(x, y, radius, startAngle, endAngle) {
    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    const d = [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    ].join(' ');

    return d;
  }

  componentDidMount() {
    let elem = document.querySelector('.loding-circle');
    let style = getComputedStyle(elem);
    this.circleHeight = parseInt(style.height.split("px")[0]);
    this.circleWidth = parseInt(style.width.split("px")[0]);
  }

  render() {
    const lodingStyle = {
      left:(window.innerWidth / 2)  - (this.circleWidth/2),
      top:(window.innerHeight / 2)  - (this.circleHeight /2), 
    }
    const state = this.state;
    const color = this.props.color;
    const angle = state.arcCompletion * this.props.maxArcAngle;
    const rotation = (state.rotationCompletion * 360) + state.rotationOffset;
    const startAngle = state.flipArcDirection ? 0 : angle;
    const endAngle = state.flipArcDirection ? angle + this.props.minArcAngle : this.props.maxArcAngle + this.props.minArcAngle;

    // Creates the path's d attribute
    const d = this.describeArc(50, 50, 40, startAngle, endAngle);

    return (
      <div className='loadingSpinner'>
        <svg className="loding-circle" 
          height={this.props.size}
          width={this.props.size}
          color={color}
          viewBox="0 0 100 100"
          style={lodingStyle}
        > 
          <g transform={`rotate(${rotation} 50 50)`}>
            <path
              fill="none"
              stroke={color}
              strokeWidth={this.props.thickness}
              strokeLinecap="round"
              d={d}
            />
          </g>
        </svg>
      </div>
    );
  }
}

LoadingSpinner.defaultProps = {
  minArcAngle: 10,
  maxArcAngle: 250,
  thickness: 10,
  size: 150,
  rotationDuration: 2000,
  arcDuration: 1500,
  color: '#5B96FF',
  // Uses the standard material design easing curve
  // https://material.io/guidelines/motion/duration-easing.html#duration-easing-natural-easing-curves
  easing: bezierEasing(0.4, 0.0, 0.2, 1),
};

export default LoadingSpinner;