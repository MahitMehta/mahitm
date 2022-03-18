import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useStyles } from './styles';
import gsap from 'gsap';
import Typist from 'react-typist';
import TerminalCommands from './components/TerminalCommands';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../redux/reducers';
import { getModelLoadedPercent } from '../../redux/selectors/bootstrap.selectors';
import { setTerminalAnimationComplete } from '../../redux/actions/bootstrap.actions';

const Terminal = () => {
    const classes = useStyles();
    const terminalRef = useRef<HTMLDivElement | null>(null);
    const [ bootstrapCommandComplete, setBootstrapCommandComplete ] = useState(false);
    const [ loadingCommandComplete, setLoadingCommandComplete] = useState(false);
    const state = useSelector((state:IRootReducer) => state);
    const dispatch = useDispatch();
    const modelLoadedPercentage = getModelLoadedPercent(state);

    const disappear = useCallback(() => {
        if (!loadingCommandComplete || modelLoadedPercentage != 100) return; 
        
        gsap.timeline({
            repeat: 0,
        }).to(
            terminalRef.current, {
                scale: 2,
                opacity: 0,
                delay: 0.5,
                duration: 0.5,
                pointerEvents: 'none',
            }
        ).eventCallback('onComplete', () => {
            dispatch(setTerminalAnimationComplete(true));
        });
    }, [ loadingCommandComplete, modelLoadedPercentage, terminalRef ]);

    useEffect(disappear, [ disappear ]);
    
    useEffect(() => {
        if (!terminalRef.current) return; 

        const animation = gsap
            .timeline({ repeat: 0 })
            .fromTo(terminalRef.current, {
                opacity: 1,
                scale: 0.5,
            }, { opacity: 1, scale: 1 })
        return () => {
            animation.kill();
        };
    }, [ terminalRef ]);

    return (
        <div style={bootstrapCommandComplete ? { zIndex: -1 } : {}} className={classes.container}>
            <div className={classes.terminal} ref={terminalRef}>
                <div className={classes.navbar}>
                    <div className={classes.navDots}>
                        <span style={{ backgroundColor: "#FF326D" }} className={classes.navDot}></span>
                        <span style={{ backgroundColor: "#FFCA32" }} className={classes.navDot}></span>
                        <span style={{ backgroundColor: "#32FF6D" }} className={classes.navDot}></span>
                    </div>
                    <div className={classes.userContainer}>
                        <p className={classes.userAgent}>mahitmehta -- -zsh -- 45vw x 30vw</p>
                    </div>
                </div>
                <TerminalCommands className={classes.terminalLines}>
                    <code className={classes.terminalLine}>
                        Last login: Fri Feb 13 14:02:33 on ttys003
                    </code>
                    <code className={classes.terminalLine}>
                        mahitmehta@Mahits-MacBook-Pro-334 ~ % 
                        <Typist
                            onTypingDone={() => setBootstrapCommandComplete(true)}
                            startDelay={250}
                            avgTypingDelay={60}
                            cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0, blink: true }} 
                            className={classes.dockerCommand}> 
                                &nbsp;docker-compose up
                        </Typist>
                    </code>
                    <br/>
                </TerminalCommands>
                {
                    bootstrapCommandComplete && (
                        <TerminalCommands className={classes.terminalLines}>
                            <TerminalCommands.Delay delay={0} />
                            <code className={classes.dockerLine}>
                                <span>Starting mongodb</span>
                                <span className={classes.commandDone}>done</span>
                            </code>
                            <TerminalCommands.Delay delay={500} />
                            <code className={classes.dockerLine}>
                                <span>Starting mahitm_web_1</span>
                                <span className={classes.commandDone}>done</span>
                            </code>
                            <br/>
                            <TerminalCommands.Delay delay={500} />
                            <code className={classes.terminalLine}>
                                mahitmehta@Mahits-MacBook-Pro-334 ~ % 
                                <Typist
                                    onTypingDone={() => setLoadingCommandComplete(true)}
                                    startDelay={0}
                                    avgTypingDelay={60}
                                    cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0, blink: true }} 
                                    className={classes.dockerCommand}> 
                                        &nbsp;curl GET / HTTP/1.1 Host: mahitm.com
                                </Typist>
                            </code>
                        </TerminalCommands>
                    )
                }
                {
                    loadingCommandComplete && (
                        <div className={classes.terminalLines}>
                            <code className={classes.dockerLine}>
                                <span>Downloading Static Files:</span>
                                <span className={classes.commandDone}>{ Math.round(modelLoadedPercentage) }</span>
                            </code>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Terminal; 