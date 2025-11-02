import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { User } from "../../../models/models";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Chip,
  Paper,
  Divider,
  Skeleton,
  IconButton,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export interface UserDetailProps {
  id: string;
}

interface InfoItemProps {
  label: string;
  value: string | number | null | undefined;
  icon?: React.ReactNode;
}

function InfoItem({ label, value, icon }: InfoItemProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
        {icon}
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {value || "N/A"}
      </Typography>
    </Box>
  );
}

export default function UsersDetail(props: UserDetailProps) {
  const navigate = useNavigate();
  const [state, setState] = useState<{ user: User | null; loading: "pending" | "finished" }>({
    user: null,
    loading: "pending",
  });

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${props.id}`)
      .then((res: Response) => res.json())
      .then((users) => {
        setState({
          user: users,
          loading: "finished",
        });
      });
  }, [props.id]);

  if (state.loading === "pending") {
    return (
      <Box sx={{ py: 3 }}>
        <Skeleton variant="rectangular" height={200} sx={{ mb: 3, borderRadius: 2 }} />
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
          </Box>
        </Box>
      </Box>
    );
  }

  if (!state.user) {
    return (
      <Box sx={{ py: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          User not found
        </Typography>
      </Box>
    );
  }

  const user = state.user;
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Box sx={{ py: 3, overflow: "auto" }}>
      {/* Header with Back Button */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "background.paper" }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          User Details
        </Typography>
      </Box>

      {/* Profile Header Card */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 3, alignItems: { xs: "center", sm: "flex-start" } }}>
            <Avatar
              src={user.image}
              sx={{
                width: { xs: 120, sm: 150 },
                height: { xs: 120, sm: 150 },
                border: "4px solid",
                borderColor: "primary.main",
              }}
            />
            <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {fullName}
              </Typography>
              <Chip label={user.role} color="primary" sx={{ mb: 2 }} />
              <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", justifyContent: { xs: "center", sm: "flex-start" } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {user.phone}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, flexWrap: "wrap", gap: 3 }}>
        {/* Personal Information */}
        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" }, minWidth: { xs: "100%", md: "300px" } }}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <PersonIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Personal Information
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <InfoItem label="Age" value={user.age} />
            <InfoItem label="Gender" value={user.gender} />
            <InfoItem label="Birth Date" value={new Date(user.birthDate).toLocaleDateString()} />
            <InfoItem label="Height" value={`${user.height} cm`} />
            <InfoItem label="Weight" value={`${user.weight} kg`} />
            <InfoItem label="Blood Group" value={user.bloodGroup} />
            <InfoItem label="Eye Color" value={user.eyeColor} />
            <InfoItem label="Hair Color" value={user.hair.color} />
            <InfoItem label="Hair Type" value={user.hair.type} />
            <InfoItem label="Username" value={user.username} />
          </Paper>
        </Box>

        {/* Address Information */}
        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" }, minWidth: { xs: "100%", md: "300px" } }}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <LocationOnIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Address
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <InfoItem label="Street" value={user.address.address} />
            <InfoItem label="City" value={user.address.city} />
            <InfoItem label="State" value={`${user.address.state} (${user.address.stateCode})`} />
            <InfoItem label="Postal Code" value={user.address.postalCode} />
            <InfoItem label="Country" value={user.address.country} />
            <Box sx={{ mt: 2, p: 2, bgcolor: "action.hover", borderRadius: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Coordinates
              </Typography>
              <Typography variant="body2">
                Lat: {user.address.coordinates.lat}, Lng: {user.address.coordinates.lng}
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Company Information */}
        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" }, minWidth: { xs: "100%", md: "300px" } }}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <BusinessIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Company Information
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <InfoItem label="Company Name" value={user.company.name} />
            <InfoItem label="Department" value={user.company.department} />
            <InfoItem label="Title" value={user.company.title} />
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Company Address
              </Typography>
              <InfoItem label="Street" value={user.company.address.address} />
              <InfoItem label="City" value={user.company.address.city} />
              <InfoItem label="State" value={`${user.company.address.state} (${user.company.address.stateCode})`} />
              <InfoItem label="Postal Code" value={user.company.address.postalCode} />
              <InfoItem label="Country" value={user.company.address.country} />
            </Box>
          </Paper>
        </Box>

        {/* Additional Information */}
        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" }, minWidth: { xs: "100%", md: "300px" } }}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <SchoolIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Additional Information
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <InfoItem label="University" value={user.university} />
            <InfoItem label="EIN" value={user.ein} />
            <Box sx={{ mt: 2, mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <AccountBalanceIcon color="primary" />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Bank Details
                </Typography>
              </Box>
              <InfoItem label="Card Type" value={user.bank.cardType} />
              <InfoItem label="Card Number" value={user.bank.cardNumber} />
              <InfoItem label="Card Expire" value={user.bank.cardExpire} />
              <InfoItem label="Currency" value={user.bank.currency} />
              <InfoItem label="IBAN" value={user.bank.iban} />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Crypto Wallet
              </Typography>
              <InfoItem label="Coin" value={user.crypto.coin} />
              <InfoItem label="Wallet" value={user.crypto.wallet} />
              <InfoItem label="Network" value={user.crypto.network} />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}