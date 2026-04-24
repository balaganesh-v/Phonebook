const ContactInfo = ({ name, phone }) => {
    return (
        <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate" title={name}>
                {name}
            </p>
            <p className="text-slate-400 text-xs truncate mt-0.5">
                {phone || "No phone number"}
            </p>
        </div>
    );
};

export default ContactInfo;