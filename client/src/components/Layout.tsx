
export const Layout = ({ children }: any) => {
    return (
        <>
            <div className="layout">
                <div className="container content">
                    {children}
                </div>
            </div>
        </>
    );
}