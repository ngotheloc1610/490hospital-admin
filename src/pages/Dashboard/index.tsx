import { memo } from "react";
import Layout from "../../components/Layout";


const Dashboard = () => {
    return (
        <Layout>
            <section id="dashboard">
                <div className="blockmodule blockmoule-fullpage">
                    <div className="blockmodule-wrap">
                        <div className="blockmodule-wrap--shadown">
                            <div className="blockmodule-mainbody table-responsive mt-4">
                                table data
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default memo(Dashboard);