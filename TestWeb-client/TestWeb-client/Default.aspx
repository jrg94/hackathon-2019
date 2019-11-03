<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="TestWeb_client._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    

        
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">


         <!-- Content Row -->

          <div class="row">
            <script src="https://d3js.org/d3.v5.min.js"></script>
	        <script src="js\vis.js"></script>

                
                </div>
                    
                    <svg id="vis"></svg>
                      <svg id="bar"><text x="150" y="20" font-family="sans-serif" font-size="15px">Gross Square Footage of Location Types</text></svg>
                    <svg id="Legend"></svg>
                  </div>






  
        <!-- /.container-fluid -->

      

</asp:Content>
