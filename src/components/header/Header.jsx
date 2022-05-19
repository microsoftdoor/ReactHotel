import "./header.css"
import {useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import DateRange from "react-date-range/dist/components/DateRange";
import { useState } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns"


const Header = ({type}) => {

    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ])
    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })

    const navigate = useNavigate()


    //WE EXPORTED STATES TO THE PAGE WE WANTED TO EXPORT TO USING NAVIGATE
    const handleSearch = () => {
        navigate("/hotels", {state: {destination, date, options}})
    }

    const handleOption = (name, operation) => {
        setOptions(prev => {
            return {...prev, [name]: operation === "i" ? options[name] + 1 : options[name] -1}
        })
    }

    return ( 
    <div className="header">
        <div className={ type === "list" ? "headerContainer listmode" : "headerContainer"}>
            <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car rentals</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faStar} />
                    <span>Attractions</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport Taxi</span>
                </div>
            </div>
            {type !== "list" &&
            <>
            <h1 className="headerTitle">A lifetime of discounts? It's genius</h1>
            <p className="headerDesc">
                Get rewarded for your travels. Unlock instant savings of 10% or ore with Booking App Discount
            </p>
            <button className="headerButton">Sign In / Register</button>

            <div className="headerSearch">
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faBed} className="headerIcon"/>
                    <input type="text" className="headerSearchInput" placeholder="Where to?" onChange={e =>setDestination(e.target.value)}/>
                </div>
            
            
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                    <span onClick={()=> setOpenDate(!openDate)} className="headerSearchText">{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                    {openDate && <DateRange
                        editableDateInputs={true}
                        onChange={item => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className="date"
                        />}
                </div>
            
            
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                    <span onClick={()=> setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult ${options.children} children ${options.room} room`}</span>
                    { openOptions && 
                    <div className="options">
                        <div className="optionItem">
                        <div>
                                <span className="optionText">Adult</span>
                            </div>
                            <div className="optionCounter">
                                <button className="optionCounterButton" disabled={options.adult < 2} onClick={()=> handleOption("adult", "d")}>-</button>
                                <span className="optionCounterNumber">{options.adult}</span>
                                <button className="optionCounterButton" onClick={()=> handleOption("adult", "i")}>+</button>
                            </div>
                        </div>
                        <div className="optionItem">
                        <div>
                                <span className="optionText">Children</span>
                            </div>
                            <div className="optionCounter">
                                <button className="optionCounterButton" disabled={options.children < 1} onClick={()=> handleOption("children", "d")}>-</button>
                                <span className="optionCounterNumber">{options.children}</span>
                                <button className="optionCounterButton" onClick={()=> handleOption("children", "i")}>+</button>
                            </div>
                        </div>
                        <div className="optionItem">
                            <div>
                                <span className="optionText">Room</span>
                            </div>
                            <div className="optionCounter">
                                <button className="optionCounterButton" disabled={options.room < 2} onClick={()=> handleOption("room", "d")}>-</button>
                                <span className="optionCounterNumber">{options.room}</span>
                                <button className="optionCounterButton" onClick={()=> handleOption("room", "i")}>+</button>
                            </div>
                        </div>
                    </div>}
                </div>

                <div className="headerSearchItem">
                    <button className="headerButton" onClick={handleSearch}>Search</button>
                </div>

            </div>
            </>}
        </div>
    </div> );
}
 
export default Header;

