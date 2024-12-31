export default function PropertyDisplay({children, icon, iconSize="1rem", className}) {
    return <div className={`horizontal-container bottom-padding ${className}`}>
        <div className="icon-box padding-right">
            {icon({color: "var(--primary-highlight)", size: iconSize})}
        </div> 
        <span>{children}</span>
    </div>
}