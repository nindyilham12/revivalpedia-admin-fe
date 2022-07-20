/**
 * Chakra reference
 * https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme/src/components
 */

import Alert from './alert';
import Avatar from './avatar';
import Badge from './badge';
import Button from './button';
import Checkbox from './checkbox';
import FormLabel from './form-label';
import Heading from './heading';
import Input from './input';
import Modal from './modal';
import Switch from './switch';
import Table from './table';
import Tabs from './tabs';
import Text from './text';
import CustomComponents from './custom';

export default {
  Alert,
  Avatar,
  Badge,
  Button,
  Checkbox,
  FormLabel,
  Heading,
  Input,
  Modal,
  Switch,
  Table,
  Tabs,
  Text,
  ...CustomComponents,
} as const;
