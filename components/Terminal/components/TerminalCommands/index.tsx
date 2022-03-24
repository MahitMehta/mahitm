import React, { ReactChild } from 'react';
import { isComponentSameType } from '../../../../utils/findComponentByType';

interface TerminalCommandsProps extends React.HTMLProps<HTMLDivElement>{
    children: ReactChild[],
}

interface ITerminalCommands {
    containerRef: React.RefObject<HTMLDivElement>;
}

interface ITerminalDelay {
    delay?: number;
}

interface IState{
    elements: {
        child: React.ReactElement<any>,
        index: number,
    }[],
}

class TerminalCommands extends React.Component<TerminalCommandsProps, IState> implements ITerminalCommands {
    containerRef; 
    static Delay: React.FC<ITerminalDelay>;

    constructor(props:TerminalCommandsProps) {
        super(props);
        this.containerRef = React.createRef<HTMLDivElement>();
        this.state = { elements: [] }
    }

    updateElements() {
        let delay = 0; 
        React.Children.forEach(this.props.children as any, (child: React.ReactElement<any>, index: number) => {
            const isDelay = isComponentSameType(child, Delay);
            if (isDelay) delay += child.props?.delay || 0; 
            const exists = this.state.elements.find(({ index }) => index === index);
            if (!exists && !isDelay) {
                setTimeout(() => {
                    this.setState({ elements: [ ...this.state.elements, { child, index }] })
                }, delay);
            } else if (exists && !isDelay) {
                const elementsImage = this.state.elements;
                elementsImage[index] = { child, index };
                this.setState({ elements: [ ...elementsImage ]});
            }
        });
    }

    componentDidMount() {
        this.updateElements();
    }

    render() {
        return (
            <div ref={this.containerRef} { ...this.props }>
                {
                    React.Children.map(this.state.elements.map(({ child }) => child) as any, 
                        (child: React.ReactElement<any>) => {
                            return child; 
                        })
                }
            </div>
        )
    }
}

const Delay : React.FC<ITerminalDelay> = () => {
    return null; 
};

TerminalCommands.Delay = Delay; 

export default TerminalCommands;